import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { latLonToVector3 } from '../utils/earthquakeUtils';
import { magnitudeToColor, magnitudeToSize } from '../utils/colorScale';

const Globe = ({ earthquakes, onEarthquakeClick, selectedEarthquake }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const markersRef = useRef([]);
  const earthRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // prevent React from mounting component twice
    containerRef.current.innerHTML = ''; 

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Earth sphere
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2244aa,
      emissive: 0x112244,
      specular: 0x333333,
      shininess: 25
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(2.01, 36, 18);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.7,
      transparent: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      earth.rotation.y += deltaX * 0.005;
      earth.rotation.x += deltaY * 0.005;
      wireframe.rotation.copy(earth.rotation);
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(3, Math.min(10, camera.position.z));
    };

    // Click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersRef.current);

      if (intersects.length > 0) {
        const clickedMarker = intersects[0].object;
        if (clickedMarker.userData.earthquake) {
          onEarthquakeClick(clickedMarker.userData.earthquake);
        }
      }
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('click', onClick);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isDragging) {
        earth.rotation.y += 0.001;
        wireframe.rotation.y += 0.001;
      }

      // Pulse markers
      const time = Date.now() * 0.003;
      markersRef.current.forEach((marker, i) => {
        const scale = 1 + Math.sin(time + i * 0.5) * 0.3;
        marker.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    sceneRef.current = { scene, camera, renderer, earth, wireframe };

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('click', onClick);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onEarthquakeClick]);

  // Add earthquake markers
  useEffect(() => {
    if (!sceneRef.current || !earthquakes || !earthRef.current) return;

    const { scene, earth } = sceneRef.current;

    // Remove old markers
    markersRef.current.forEach(marker => {
      scene.remove(marker);
      marker.geometry.dispose();
      marker.material.dispose();
    });
    markersRef.current = [];

    // Add new markers
    earthquakes.forEach((earthquake, index) => {
      const { geometry, properties } = earthquake;
      const [lon, lat] = geometry.coordinates;
      const magnitude = properties.mag;

      if (magnitude === null || magnitude === undefined) return;

      const position = latLonToVector3(lat, lon, 2.05);
      const color = magnitudeToColor(magnitude);
      const size = magnitudeToSize(magnitude);

      const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.9
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(position.x, position.y, position.z);
      marker.userData = { earthquake };

      // Highlight selected
      if (selectedEarthquake && selectedEarthquake.id === earthquake.id) {
        markerMaterial.emissive = new THREE.Color(0xffffff);
        markerMaterial.emissiveIntensity = 1;
      }

      scene.add(marker);
      markersRef.current.push(marker);
    });

    console.log(`Added ${markersRef.current.length} earthquake markers`);
  }, [earthquakes, selectedEarthquake]);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100vw', height: '100vh', cursor: 'grab' }}
    />
  );
};

export default Globe;