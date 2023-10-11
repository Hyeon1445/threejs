import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// SpotLight

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Shadow
  renderer.shadowMap.enabled = true;
  //renderer.shadowMap.type = THREE.PCFShadowMap; // default
  //renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 1);
  scene.add(ambientLight);
  const spotLight = new THREE.SpotLight("white", 20, 30, Math.PI / 6); // 무대조명
  spotLight.position.x = -5;
  spotLight.position.y = 3;
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight); // light의 위치를 확인 가능.
  scene.add(spotLightHelper);

  // Shadow
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024; // 그림자 화질 설정, default 512
  spotLight.shadow.radius = 5; // shadow blur 효과, PCFShadowMap에서만 사용
  //spotLight.shadow.camera.near = 1;
  //spotLight.shadow.camera.far = 7;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);
  const material1 = new THREE.MeshStandardMaterial({ color: "white" });
  const material2 = new THREE.MeshStandardMaterial({ color: "royalblue" });
  const material3 = new THREE.MeshStandardMaterial({ color: "gold" });
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);
  plane.rotation.x = -Math.PI / 2;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);
  scene.add(plane, box, sphere);

  // Shadow
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(camera.position, "x", -5, 5, 0.1).name("카메라 X");
  gui.add(camera.position, "y", -5, 5, 0.1).name("카메라 Y");
  gui.add(camera.position, "z", 2, 10, 0.1).name("카메라 Z");
  gui.add(spotLight.position, "x", -5, 5).name("light x");
  gui.add(spotLight.position, "y", -5, 5).name("light y");
  gui.add(spotLight.position, "z", -5, 5).name("light z");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();
    // 빛이 원으로 돌기
    //spotLight.position.x = Math.cos(time) * 5;
    //spotLight.position.z = Math.sin(time) * 5;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
