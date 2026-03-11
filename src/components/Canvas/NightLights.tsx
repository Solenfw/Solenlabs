import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { NightLightsProps } from '@types';

// Shaders
import { nightLightsShader } from '@shaders/nightLightShader';


const NightLights = ({ sunDirection, dayMapTexture, nightMapTexture } : NightLightsProps) => {
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


export default NightLights;