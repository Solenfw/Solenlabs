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
import { drawThreeGeo } from '../hooks/getThreeGeoJSON';
import { getStarfield } from '../hooks/getStarField';
import { getFresnelMat } from '../hooks/getFresnelMat';
import { addMarker } from '../utils/earthquakeUtils';
import { magnitudeToColor, magnitudeToSize } from '../utils/colorScale';

// Shaders
import { nightLightsShader } from '../shaders/nightLightShader'; 

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
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.enablePan = false;
    
    // Texture loader
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Earth group with axial tilt
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);

    // GeoJSON countries overlay layer - rotatig with Earth
    const countries = drawThreeGeo({
      json: geoJsonData,
      radius: 1.0,
      materialOptions: { color: 0x00ff00, opacity: 0.2 }
    });
    earthGroup.add(countries);

    // Main Earth mesh with day texture
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: loader.load(dayMapTexture),
      specularMap: loader.load(earthSpecTexture),
      bumpMap: loader.load(earthBumpTexture),
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    earthGroup.add(earthMesh);
  
    // Night lights layer using custom shader
    const uniforms = {
      sunDirection: {value: new THREE.Vector3(-1.5,1.5,0.5) }, // approximate sun direction
      dayTexture: { value: loader.load( dayMapTexture ) },
      nightTexture: { value: loader.load( nightMapTexture ) }
    };

    const lightsMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: nightLightsShader.vertexShader,
      fragmentShader: nightLightsShader.fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
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

    // Starfield background
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    // add some sample markers
    addMarker(37.7749, -122.4194, earthGroup); // San Francisco
    addMarker(35.6895, 139.6917, earthGroup); // Tokyo
    addMarker(-33.8688, 151.2093, earthGroup); // Sydney
    addMarker(51.5074, -0.1278, earthGroup); // London

    // Animation loop
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      earthGroup.rotation.y += 0.001;
      cloudsMesh.rotation.y += 0.0005; // Additional rotation to maintain the original clouds speed (total 0.0015)
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