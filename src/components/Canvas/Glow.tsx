import { useMemo } from 'react';
import { getFresnelMat } from '@hooks/getFresnelMat';


const Glow = () => {
  const material = useMemo(() => getFresnelMat(), []);
  return (
    <mesh scale={1.01}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export default Glow;