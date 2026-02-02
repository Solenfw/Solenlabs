import { useTexture } from '@react-three/drei';

const EarthMesh = ({ dayMapTexture, earthSpecTexture, earthBumpTexture } : { dayMapTexture: string, earthSpecTexture: string, earthBumpTexture: string }) => {
  const [dayMap, spec, bump] = useTexture([dayMapTexture, earthSpecTexture, earthBumpTexture]);
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial map={dayMap} specularMap={spec} bumpMap={bump} bumpScale={0.04} />
    </mesh>
  );
};

export default EarthMesh;