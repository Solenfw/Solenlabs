import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Countries from './Countries';
import EarthMesh from './EarthMesh';
import NightLights from './NightLights';
import Clouds from './Clouds';
import Glow from './Glow';
import EarthquakeMarkers from './EarthQuakeMarkers';

// constants
import { EARTH_MAPS } from '../../constants/earth_textures';

const Earth = ({ controls, earthquakes } : { controls: any, earthquakes: any[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += controls.earthRotationSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y += controls.cloudsRotationSpeed;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, -23.4 * Math.PI / 180]}>
      {/* <Countries /> */}
      <EarthMesh 
        dayMapTexture={EARTH_MAPS.dayMap}
        earthSpecTexture={EARTH_MAPS.specs}
        earthBumpTexture={EARTH_MAPS.bumpMap}
      />
      <NightLights sunDirection={controls.sunDirection} dayMapTexture={EARTH_MAPS.dayMap} nightMapTexture={EARTH_MAPS.nightMap} />
      <Clouds earthCloudsTexture={EARTH_MAPS.clouds} earthCloudsTransparent={EARTH_MAPS.cloudTransparency}  ref={cloudsRef} />
      <Glow />
      <EarthquakeMarkers earthquakes={earthquakes} />
    </group>
  );
};

export default Earth;