/* eslint-disable no-unused-vars */
import { useMemo, useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { useControls } from 'leva';

// Textures
import earthCloudsTransparent from '../assets/textures/earthcloudmaptrans.jpg';
import earthCloudsTexture from '../assets/textures/earth-cloud.jpg';
import earthSpecTexture from '../assets/textures/earthspecs.jpg';
import earthBumpTexture from '../assets/textures/earth-bump.jpg';
import dayMapTexture from '../assets/textures/earth-daymap.jpg';
import nightMapTexture from '../assets/textures/earth-nightmap.jpg';
import geoJsonData from '../assets/geojson/ne_50m_countries.json';

// Hooks
import { drawThreeGeo } from '../hooks/getThreeGeoJSON';
import { getStarfield } from '../hooks/getStarField';
import { getFresnelMat } from '../hooks/getFresnelMat';
import { useEarthquakes } from '../hooks/useEarthquakes';

// Utils
import { drawEarthQuakePoint } from '../utils/earthquakeUtils';
import { magnitudeToColor, magnitudeToSize } from '../utils/colorScale';

// Shaders
import { nightLightsShader } from '../shaders/nightLightShader';

const Countries = () => {
  const countries = useMemo(() => drawThreeGeo({
    json: geoJsonData,
    radius: 1.0,
    materialOptions: { color: 0x00ff00, opacity: 0.2 }
  }), []);
  return <primitive object={countries} />;
};

const EarthMesh = () => {
  const [dayMap, spec, bump] = useTexture([dayMapTexture, earthSpecTexture, earthBumpTexture]);
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial map={dayMap} specularMap={spec} bumpMap={bump} bumpScale={0.04} />
    </mesh>
  );
};

const NightLights = ({ sunDirection } : { sunDirection: number[] }) => {
  const [dayTex, nightTex] = useTexture([dayMapTexture, nightMapTexture]);
  const uniforms = useMemo(() => ({
    sunDirection: { value: new THREE.Vector3(...sunDirection) },
    dayTexture: { value: dayTex },
    nightTexture: { value: nightTex }
  }), [dayTex, nightTex, sunDirection]);
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={nightLightsShader.vertexShader}
        fragmentShader={nightLightsShader.fragmentShader}
        blending={THREE.AdditiveBlending}
        transparent
      />
    </mesh>
  );
};

const Clouds = forwardRef((_props, ref) => {
  const [cloudMap, alphaMap] = useTexture([earthCloudsTexture, earthCloudsTransparent]);
  return (
    <mesh ref={ref} scale={1.003}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={cloudMap}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        alphaMap={alphaMap}
      />
    </mesh>
  );
});

const Glow = () => {
  const material = useMemo(() => getFresnelMat(), []);
  return (
    <mesh scale={1.01}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const EarthquakeMarkers = ({ earthquakes } : { earthquakes: any[] }) => {
  return (
    <>
      {earthquakes.map((eq, index) => {
        const lat = eq.geometry.coordinates[1];
        const lon = eq.geometry.coordinates[0];
        const mag = eq.properties.mag;
        const marker = drawEarthQuakePoint(lat, lon, { 
          size: magnitudeToSize(mag),
          color: magnitudeToColor(mag),
        });
        return <primitive key={index} object={marker} />;
      })}
    </>
  );
};

const Earth = ({ controls, earthquakes } : { controls: any, earthquakes: any[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += controls.earthRotationSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y += controls.cloudsRotationSpeed;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, -23.4 * Math.PI / 180]}>
      <Countries />
      <EarthMesh />
      <NightLights sunDirection={controls.sunDirection} />
      <Clouds ref={cloudsRef} />
      <Glow />
      <EarthquakeMarkers earthquakes={earthquakes} />
    </group>
  );
};

const Stars = ({ controls } : { controls: any }) => {
  const starsRef = useRef<THREE.Mesh>(null);
  const stars = useMemo(() => getStarfield({ numStars: 2000 }), []);

  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y -= controls.starsRotationSpeed;
  });

  return <primitive ref={starsRef} object={stars} />;
};

const Globe = () => {
  const { earthquakes } = useEarthquakes();
  const controls = useControls({
    earthRotationSpeed: { value: 0.001, min: 0, max: 0.01 },
    cloudsRotationSpeed: { value: 0.0005, min: 0, max: 0.01 },
    starsRotationSpeed: { value: 0.0001, min: 0, max: 0.01 },
    sunDirection: { value: [-1.5, 1.5, 0.5] },
  });

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Earth controls={controls} earthquakes={earthquakes} />
        <Stars controls={controls} />
        <ambientLight intensity={0.01} />
        <directionalLight position={[1, 1, 1]} intensity={0.5} />
        <OrbitControls enableDamping minDistance={2} maxDistance={20} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Globe;