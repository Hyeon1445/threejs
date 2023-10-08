import * as THREE from "three";

const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // antialias: 계단현상 방지&성능저하
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera( // 원근카메라
  75, // 시야갹(field of view)
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near
  1000 // far
);
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 1;
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 그리기
renderer.render(scene, camera);
