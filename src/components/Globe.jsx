/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import earthCloudsTransparent from '../assets/images/earthcloudmaptrans.jpg';
import earthCloudsTexture from '../assets/images/8k_earth_clouds.jpg';
import earthSpecTexture from '../assets/images/8081_earthspec4k.jpg';
import earthBumpTexture from '../assets/images/earth-bump.jpg';
import dayMapTexture from '../assets/images/8k_earth_daymap.jpg';
import nightMapTexture from '../assets/images/8k_earth_nightmap.jpg';
import geoJsonData from '../assets/geojson/ne_50m_countries.json';

import { getLayer } from "../hooks/getLayer";
import { getStarfield } from '../hooks/getStarField';
import { drawThreeGeo } from '../hooks/getThreeGeoJSON';
import { getFresnelMat } from '../hooks/getFresnelMat';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { latLonToVector3 } from '../utils/earthquakeUtils';
import { magnitudeToColor, magnitudeToSize } from '../utils/colorScale';

const Globe = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    
    // scene.fog = new THREE.FogExp2(0x000000, 0.15); // Optional: Add fog for depth effect

    // set up camera
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5; // Move camera back 5 units so we can see objects at origin
    
    // ============================================
    // RENDERER - Draws the scene to the canvas
    // ============================================
    const renderer = new THREE.WebGLRenderer({ 
        // antialias: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h); 
    mountRef.current.appendChild(renderer.domElement); // Add canvas to DOM
    
    // ============================================
    // CONTROLS - Mouse interaction for camera
    // ============================================
    const ctrls = new OrbitControls(camera, renderer.domElement);
    ctrls.enableDamping = true; 
    ctrls.minDistance = 2.5;
    ctrls.maxDistance = 20;
    ctrls.enablePan = false;
    
    // ============================================
    // SPHERE - Earth geometry with wireframe overlay (GROUP)
    // ============================================
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);
    const detail = 12;
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(dayMapTexture),
      specularMap: loader.load(earthSpecTexture),
      bumpMap: loader.load(earthBumpTexture),
      bumpScale: 0.04,
    });
    // material.map.colorSpace = THREE.SRGBColorSpace;
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // const lineMat = new THREE.LineBasicMaterial({ 
    //   color: 0xffffff,
    //   transparent: true,
    //   opacity: 0.01,
    // });
    // const edges = new THREE.EdgesGeometry(geometry);
    // const line = new THREE.LineSegments(edges, lineMat);
    // scene.add(line); 
    
    // Night lights layer
    const lightsMat = new THREE.MeshBasicMaterial({
      map: loader.load(nightMapTexture),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.2,
    });
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    // Fresnel glow effect
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: loader.load(earthCloudsTexture),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: loader.load(earthCloudsTransparent),
      // alphaTest: 0.3,
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);


    // Fresnel material function
    const fresnelMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh); 


    // ============================================
    // LIGHTING - Hemisphere + Directional + Night light for realistic Earth
    // ============================================

    // Ambient base light - soft overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.01); // Low intensity
    scene.add(ambientLight);

    // Main sunlight - simulates the sun
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 5); // Position sun at an angle
    scene.add(sunLight);

    // Optional: Add a subtle fill light on the dark side
    // const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3); // Bluish tint
    // fillLight.position.set(-5, 0, -5); // Opposite side of sun
    // scene.add(fillLight);

    // Night light to simulate city lights
    // const lightMat = new THREE.MeshBasicMaterial({
    //   color: 0xffffaa,
    //   transparent: true,
    //   opacity: 0.2,
    //   map: new THREE.TextureLoader().load(nightMapTexture),
    // });
    // const lightMesh = new THREE.Mesh(geometry, lightMat);
    // scene.add(lightMesh);

    // ============================================
    // BACKGROUND - Sprite-based gradient layer
    // ============================================
    // const gradientBackground = getLayer({
    //   hue: 0.07,         // color (0-1 scale)
    //   numSprites: 8,    // 8 sprite particles
    //   opacity: 0.2,     // Semi-transparent
    //   radius: 10,       // Spread 10 units from center
    //   size: 24,         // Each sprite is 24 units large
    //   z: -15.5,         // Positioned far behind the sphere
    // });
    // scene.add(gradientBackground);

    const stars = getStarfield({numStars: 2000});
    scene.add(stars);

    // ============================================
    // LOAD & DRAW GEOJSON DATA
    // ============================================

    // const countries = drawThreeGeo({
    //   json: geoJsonData,
    //   radius: 2,
    //   materialOptions: {
    //     color: 0xffffff,
    //   },
    // });
    // scene.add(countries);


    function animate() {
      requestAnimationFrame(animate);
      
      // rotate
      earthMesh.rotation.y += 0.002;
      lightsMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0023;
      glowMesh.rotation.y += 0.002;
      stars.rotation.y -= 0.0002;

      renderer.render(scene, camera);
      ctrls.update();
    }
    animate(); 
    
    // ============================================
    // WINDOW RESIZE HANDLER - Keep canvas responsive
    // ============================================
    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
      camera.updateProjectionMatrix(); // Apply the change to camera
      renderer.setSize(window.innerWidth, window.innerHeight); // Resize canvas
    }
    window.addEventListener('resize', handleWindowResize, false);
    
  }, []); 
  
  return <div ref={mountRef} />; 
}

export default Globe;