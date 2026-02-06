import * as THREE from 'three';

const meshRefs = new Map<string, THREE.Mesh>();

export function registerMesh(id: string, mesh: THREE.Mesh) {
  meshRefs.set(id, mesh);
}

export function unregisterMesh(id: string) {
  meshRefs.delete(id);
}

export function getMeshById(id: string): THREE.Mesh | undefined {
  return meshRefs.get(id);
}

export function focusOnEarthquake(id: string, camera: THREE.Camera) {
  const mesh = meshRefs.get(id);
  if (!mesh) {
    console.warn('Mesh not found for earthquake:', id);
    return;
  }

  // Get mesh world position
  const targetPosition = new THREE.Vector3();
  mesh.getWorldPosition(targetPosition);

  // Calculate camera position (zoom to earthquake)
  const cameraDistance = 2.5; 
  const cameraPosition = targetPosition.clone().normalize().multiplyScalar(cameraDistance);

  // Move camera
  camera.position.copy(cameraPosition);
  camera.lookAt(targetPosition);

  // Highlight the mesh
  const material = mesh.material as THREE.MeshBasicMaterial;
  const originalColor = material.color.getHex();
  const originalScale = mesh.scale.clone();

  // Brighten and enlarge
  material.color.setHex(0xffffff);
  mesh.scale.multiplyScalar(2.5);

  // Reset after 2 seconds
  setTimeout(() => {
    material.color.setHex(originalColor);
    mesh.scale.copy(originalScale);
  }, 2000);
}