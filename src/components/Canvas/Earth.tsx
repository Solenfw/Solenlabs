import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import EarthMesh from './EarthMesh';
import NightLights from './NightLights';
import Clouds from './Clouds';
import Glow from './Glow';
import EarthquakeMarkers from './EarthQuakeMarkers';

// constants & types
import { Textures } from '@constants';
import { GlobeControls, EarthquakeFeature } from '@types';

const Earth = ({ controls, earthquakes } : { controls: GlobeControls, earthquakes: EarthquakeFeature[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += controls.earthRotationSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y += controls.cloudsRotationSpeed;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, -23.4 * Math.PI / 180]}>
      <EarthMesh 
        dayMapTexture={Textures.EARTH_MAPS.dayMap}
        earthSpecTexture={Textures.EARTH_MAPS.specs}
        earthBumpTexture={Textures.EARTH_MAPS.bumpMap}
      />
      <NightLights sunDirection={controls.sunDirection} dayMapTexture={Textures.EARTH_MAPS.dayMap} nightMapTexture={Textures.EARTH_MAPS.nightMap} />
      <Clouds earthCloudsTexture={Textures.EARTH_MAPS.clouds} earthCloudsTransparent={Textures.EARTH_MAPS.cloudTransparency}  ref={cloudsRef} />
      <Glow />
      <EarthquakeMarkers earthquakes={earthquakes} />
    </group>
  );
};

export default Earth;