import * as THREE from 'three';
import { forwardRef, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { CloudsProps } from '@types';


const Clouds = forwardRef(({ earthCloudsTexture, earthCloudsTransparent }: CloudsProps, ref: any) => {
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
});

export default Clouds;