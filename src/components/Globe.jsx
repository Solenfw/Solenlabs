/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Textures
import earthCloudsTransparent from '../assets/images/earthcloudmaptrans.jpg';
import earthCloudsTexture from '../assets/images/earth-cloud.jpg';
import earthSpecTexture from '../assets/images/earthspecs.jpg';
import earthBumpTexture from '../assets/images/earth-bump.jpg';
import dayMapTexture from '../assets/images/earth-daymap.jpg';
import nightMapTexture from '../assets/images/earth-nightmap.jpg';
import geoJsonData from '../assets/geojson/ne_50m_countries.json';

// Utilities
import { getLayer } from "../hooks/getLayer";
import { getStarfield } from '../hooks/getStarField';
import { drawThreeGeo } from '../hooks/getThreeGeoJSON';
import { getFresnelMat } from '../hooks/getFresnelMat';
import { latLonToVector3 } from '../utils/earthquakeUtils';
import { magnitudeToColor, magnitudeToSize } from '../utils/colorScale';

const Globe = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);
    
    // Camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2.5;
    controls.maxDistance = 20;
    controls.enablePan = false;
    
    // Texture loader
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, 12);
    
    // Earth group with axial tilt
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);
    
    // Main Earth mesh with day texture
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: loader.load(dayMapTexture),
      specularMap: loader.load(earthSpecTexture),
      bumpMap: loader.load(earthBumpTexture),
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    earthGroup.add(earthMesh);
    
    // Night lights layer
    const lightsMaterial = new THREE.MeshBasicMaterial({
      map: loader.load(nightMapTexture),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
    });
    const lightsMesh = new THREE.Mesh(geometry, lightsMaterial);
    earthGroup.add(lightsMesh);

    // Clouds layer
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: loader.load(earthCloudsTexture),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: loader.load(earthCloudsTransparent),
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    // Atmospheric glow
    const glowMesh = new THREE.Mesh(geometry, getFresnelMat());
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Starfield background
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      earthMesh.rotation.y += 0.001;
      lightsMesh.rotation.y += 0.001;
      cloudsMesh.rotation.y += 0.0015;
      glowMesh.rotation.y += 0.001;
      stars.rotation.y -= 0.0001;

      renderer.render(scene, camera);
      controls.update();
    }
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  
  return <div ref={mountRef} />; 
};

export default Globe;