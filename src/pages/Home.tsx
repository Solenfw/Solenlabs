import { ImageWithFallback } from '../components/ImageWithFallBack';
import { useState, useRef } from 'react';

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastRotation = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastRotation.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    setRotation({
      x: lastRotation.current.x + deltaY * 0.5,
      y: lastRotation.current.y + deltaX * 0.5,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Planet data with orbital properties
  const planets = [
    { 
      name: 'Mercury', 
      size: 8, 
      orbitRadius: 50, 
      duration: 8,
      color: '#8C7853',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjdXJ5JTIwcGxhbmV0fGVufDF8fHx8MTc2OTk0MTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Venus', 
      size: 12, 
      orbitRadius: 70, 
      duration: 12,
      color: '#FFC649',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW51cyUyMHBsYW5ldHxlbnwxfHx8fDE3Njk5NDEyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Earth', 
      size: 13, 
      orbitRadius: 90, 
      duration: 16,
      color: '#4A90E2',
      image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      name: 'Mars', 
      size: 10, 
      orbitRadius: 110, 
      duration: 20,
      color: '#E27B58',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJzJTIwcGxhbmV0JTIwcmVkfGVufDF8fHx8MTc2OTk0MTI1M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Jupiter', 
      size: 22, 
      orbitRadius: 140, 
      duration: 28,
      color: '#C88B3A',
      image: 'https://images.unsplash.com/photo-1707056790571-54d8612d6368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXBpdGVyJTIwcGxhbmV0fGVufDF8fHx8MTc2OTg0MzA3Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Saturn', 
      size: 20, 
      orbitRadius: 170, 
      duration: 36,
      color: '#FAD5A5',
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXR1cm4lMjBwbGFuZXQlMjByaW5nc3xlbnwxfHx8fDE3Njk5NDEyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Uranus', 
      size: 16, 
      orbitRadius: 195, 
      duration: 44,
      color: '#4FD0E7',
      image: 'https://images.unsplash.com/photo-1769364323382-e2de114ab151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBnaWFudCUyMHBsYW5ldHxlbnwxfHx8fDE3Njk5NDEyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    { 
      name: 'Neptune', 
      size: 15, 
      orbitRadius: 215, 
      duration: 52,
      color: '#4169E1',
      image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXB0dW5lJTIwcGxhbmV0fGVufDF8fHx8MTc2OTk0MTI1NHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Space Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.pexels.com/photos/30596250/pexels-photo-30596250.jpeg"
          alt="Space background"
          className="size-full object-cover opacity-60"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex size-full items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Left Side - Decorative Text */}
        <div className="flex flex-col space-y-6 max-w-xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Explore the
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600" style={{ fontSize: '1.8em' }}>
              Universe
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Journey through the cosmos and discover the wonders of space. 
            From distant galaxies to mysterious planets, adventure awaits.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
              <span>100+ Destinations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-purple-500 animate-pulse" />
              <span>∞ Possibilities</span>
            </div>
          </div>
        </div>

        {/* Right Side - Solar System */}
        <div className="flex items-center justify-center">
          <div 
            className="relative select-none"
            style={{ 
              width: '1000px', 
              height: '1000px',
              perspective: '2000px',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Solar System Container with 3D Transform */}
            <div
              className="relative size-full transition-transform"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transitionDuration: isDragging ? '0ms' : '200ms',
              }}
            >
              {/* Sun in the center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative size-16">
                  {/* Sun glow */}
                  <div className="absolute inset-0 rounded-full bg-yellow-500/60 blur-2xl animate-pulse" />
                  <div className="absolute -inset-5 rounded-full bg-orange-500/40 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                  
                  {/* Sun */}
                  <div className="relative size-16 rounded-full overflow-hidden shadow-2xl" style={{
                    boxShadow: '0 0 40px rgba(255, 200, 0, 0.8), inset -8px -8px 20px rgba(0, 0, 0, 0.3)',
                  }}>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW4lMjBzdGFyJTIwc29sYXJ8ZW58MXx8fHwxNzY5ODg1MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Sun"
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-yellow-300/50 via-orange-400/50 to-red-500/50" />
                    {/* 3D Sphere effect */}
                    <div className="absolute inset-0 rounded-full" style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 200, 0.8) 0%, rgba(255, 200, 0, 0) 50%)',
                    }} />
                    <div className="absolute inset-0 rounded-full" style={{
                      background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
                    }} />
                  </div>
                </div>
              </div>

              {/* Planets orbiting */}
              {planets.map((planet) => (
                <div key={planet.name}>
                  {/* Orbital path */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                    style={{
                      width: `${planet.orbitRadius * 2}px`,
                      height: `${planet.orbitRadius * 2}px`,
                    }}
                  />
                  
                  {/* Orbiting planet */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: `${planet.orbitRadius * 2}px`,
                      height: `${planet.orbitRadius * 2}px`,
                      animation: `orbit ${planet.duration}s linear infinite`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ width: `${planet.size}px`, height: `${planet.size}px` }}
                    >
                      {/* Planet glow */}
                      <div 
                        className="absolute -inset-1 rounded-full blur-md opacity-50"
                        style={{ backgroundColor: planet.color }}
                      />
                      
                      {/* Planet */}
                      <div className="relative size-full rounded-full overflow-hidden" style={{
                        boxShadow: `0 0 20px ${planet.color}80, inset -${planet.size * 0.2}px -${planet.size * 0.2}px ${planet.size * 0.4}px rgba(0, 0, 0, 0.6)`,
                      }}>
                        <ImageWithFallback
                          src={planet.image}
                          alt={planet.name}
                          className="size-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/10 via-transparent to-black/30" />
                        {/* 3D Sphere lighting */}
                        <div className="absolute inset-0 rounded-full" style={{
                          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
                        }} />
                        <div className="absolute inset-0 rounded-full" style={{
                          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.6) 100%)',
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stars Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute size-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom Panel - Explore Button */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center py-12 bg-linear-to-t from-black/60 via-black/30 to-transparent">
        <button className="group relative px-12 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95">
          <span className="relative z-10">Explore</span>
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}