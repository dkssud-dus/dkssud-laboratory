import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);

// 3. Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// 4. Mouse
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// 5. Donut
const loader = new GLTFLoader();

let donut;

loader.load("models/donut.glb", (gltf) => {
  donut = gltf.scene;

  console.log(donut.position);
  console.log(donut.scale);

  // Light
  const light = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(3, 8, 3);
  scene.add(dirLight);

  // Donut
  donut.scale.set(5, 5, 5);
  donut.rotation.x = 0.3;

  scene.add(gltf.scene);
  renderer.render(scene, camera);
});

//
function animate() {
  requestAnimationFrame(animate);
  if (donut) donut.rotation.y += 0.003;

  // Mouse + Camera
  camera.position.x += (mouseX * 1 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 1 + 4 - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
animate();
