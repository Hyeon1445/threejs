import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 계단현상 방지&성능저하
    alpha: true, // 투명 배경
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 기기별 화질 최적화 (2, 1은 계산 최적화를 위해)
  renderer.setClearColor(0x00ff00);
  renderer.setClearAlpha(0.5); // 투명도 설정

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue"); // renderer의 alpha, color보다는 scene의 컬러가 우선순위 높다

  // Perspective Camera (원근카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야갹(field of view)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near
    1000 // far
  );
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 1;

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  // 이벤트 (창 사이즈 변경에 대응)
  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", setSize);
}
