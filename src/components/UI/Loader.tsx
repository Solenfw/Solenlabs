import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export const Loader = () => {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(false);

  // Smooth out the disappearance (don't flash away instantly)
  useEffect(() => {
    if (active) {
      setVisible(true);
    } else {
      // Wait 500ms before hiding to show 100% briefly
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div className="loader-container">
      <div className="loader-content">
        <h1>RESEARCH LAB</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <p className="loading-text">
          Initializing Environment... {progress.toFixed(0)}%
        </p>
      </div>
    </div>
  );
};