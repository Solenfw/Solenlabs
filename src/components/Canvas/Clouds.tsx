import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { CloudsProps } from '@types';


const Clouds = ({ earthCloudsTexture, earthCloudsTransparent, ref } : CloudsProps) => {
  const [cloudMap, alphaMap] = useTexture([earthCloudsTexture, earthCloudsTransparent]);
  return (
    <mesh ref={ref} scale={1.003}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={cloudMap}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        alphaMap={alphaMap}
      />
    </mesh>
  );
};

export default Clouds;