import { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { drawThreeGeo } from '@hooks/getThreeGeoJSON';

const Countries = () => {
  const countries = useMemo(() => drawThreeGeo({
    json: useLoader(THREE.FileLoader, '/geojson/ne_50m_countries.json'),
    radius: 1.0,
    materialOptions: { color: 0x00ff00, opacity: 0.2 }
  }), []);
  return <primitive object={countries} />;
};

export default Countries;