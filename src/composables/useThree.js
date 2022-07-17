import * as THREE from 'three';
import { onMounted } from 'vue';


export const useThree = (domRef) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight)
  const renderer = new THREE.WebGL1Renderer();

  onMounted(() => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    domRef.value.appendChild(renderer.domElement)
  })

  return {
    scene,
    camera,
    renderer,
    THREE
  }
} 