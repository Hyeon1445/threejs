import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 계단현상 방지&성능저하
    //alpha: true, // 투명 배경
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 기기별 화질 최적화 (2, 1은 계산 최적화를 위해)

  // Scene
  const scene = new THREE.Scene();

  // Perspective Camera (원근카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야갹(field of view)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near
    1000 // far
  );
  camera.position.z = 5;

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //const material = new THREE.MeshBasicMaterial({ color: "red" }); // 빛에 영향 받지 않는 material
  const material = new THREE.MeshStandardMaterial({ color: "red" });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  function draw() {
    //mesh.rotation.y += 0.1; // 각도는 radian사용
    mesh.rotation.y += THREE.MathUtils.degToRad(1); // radian을 degree로 변환해주는 utils
    mesh.position.y += 0.01;
    if (mesh.position.y > 3) mesh.position.y = 0;
    renderer.render(scene, camera);
    //window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // requestAnimationFrame을 내장. WebXR을 구현할땐 setAnimationLoop을 사용.
  }

  // 이벤트 (창 사이즈 변경에 대응)
  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", setSize);

  draw();
}
