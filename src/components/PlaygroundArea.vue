<script setup>
import { onMounted, ref } from 'vue'
import { useThree } from '@/composables/useThree'
// camera, scene, renderer

const playground = ref();
const { THREE, scene, camera, renderer } =  useThree(playground)

const createLine = () => {
  const points= [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(2, 1),
  ]
  const material = new THREE.LineBasicMaterial({ color: 0xfffff })
  const geometryLine = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(geometryLine, material)
  scene.add(line)
}

const createCube = () => {
  const texture = new THREE.TextureLoader().load(require('@/assets/rock.jpeg'))
  const material1 = new THREE.MeshBasicMaterial({color: 0xc3c3c3, map: texture });
  const cubGeometry = new THREE.BoxGeometry(1,1,1);
  const cube = new THREE.Mesh(cubGeometry, material1)
  scene.add(cube)
  return {
    cube
  }
}

const cubeRef = ref(null)

onMounted(() => {
  camera.position.z = 3;
  scene.background = new THREE.Color(0x00000);
  createLine()
  const { cube } = createCube()
  cubeRef.value = cube
  animate()
})
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera)

  cubeRef.value.rotation.x += 0.01;
  cubeRef.value.rotation.y -= 0.01;
}
const fn = (e) => {
  const up = 'KeyW'
  const down = 'KeyS'
  const left = 'KeyA'
  const right = 'KeyD'
  switch(e.code) {
    case up:
      requestAnimationFrame(() => {
        cubeRef.value.position.y += 0.09
      })
      break
    case down:
      requestAnimationFrame(() => {
        cubeRef.value.position.y -= 0.09
      })
      break
    case left:
      requestAnimationFrame(() => {
        cubeRef.value.position.x -= 0.09
      })
      break
    case right:
      requestAnimationFrame(() => {
        cubeRef.value.position.x += 0.09
      })
      break
  }
}
</script>

<template>
  <div @keypress="fn" tabindex="0" ref="playground" class="playground">
    <!-- 123 -->
  </div>
</template>