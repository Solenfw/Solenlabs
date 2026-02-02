import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { getStarfield } from '@hooks/getStarField';


const Stars = ({ controls } : { controls: any }) => {
  const starsRef = useRef<THREE.Mesh>(null);
  const stars = useMemo(() => getStarfield({ numStars: 2000 }), []);

  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y -= controls.starsRotationSpeed;
  });

  return <primitive ref={starsRef} object={stars} />;
};

export default Stars;