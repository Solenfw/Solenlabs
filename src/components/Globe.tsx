/* eslint-disable no-unused-vars */
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

// Hooks
import { useEarthquakes } from '@hooks/useEarthquakes';

// canvas components
import Earth from './Canvas/Earth';
import Stars from './Canvas/Stars';

// UI Components
import { HomeButton } from './UI/homeButton';


const Globe = () => {
  const { earthquakes } = useEarthquakes();
  const controls = useControls({
    earthRotationSpeed: { value: 0.001, min: 0, max: 0.01 },
    cloudsRotationSpeed: { value: 0.0005, min: 0, max: 0.01 },
    starsRotationSpeed: { value: 0.0001, min: 0, max: 0.01 },
    sunDirection: { value: [-1.5, 1.5, 0.5] },
  });

  return (
    <div className="w-full h-screen bg-black relative">
      <HomeButton />
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Earth controls={controls} earthquakes={earthquakes} />
        <Stars controls={controls} />
        <ambientLight intensity={0.0005} />
        <directionalLight position={[1, 1, 1]} intensity={1.2} />
        <OrbitControls enableDamping minDistance={2} maxDistance={20} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Globe;