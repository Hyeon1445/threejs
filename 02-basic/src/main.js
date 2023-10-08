import * as THREE from "three";

const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( // 원근카메라
  75, // 시야갹
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near
  1000 // far
);
camera.position.z = 5;
scene.add(camera);
renderer.render(scene, camera);
