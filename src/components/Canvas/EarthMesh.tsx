import { useTexture } from '@react-three/drei';
import { EarthMeshProps } from '@types';

const EarthMesh = ({ dayMapTexture, earthSpecTexture, earthBumpTexture } : EarthMeshProps) => {
  const [dayMap, spec, bump] = useTexture([dayMapTexture, earthSpecTexture, earthBumpTexture]);
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial 
      map={dayMap} 
      specularMap={spec} 
      bumpMap={bump} 
      bumpScale={0.04} />
    </mesh>
  );
};

export default EarthMesh;