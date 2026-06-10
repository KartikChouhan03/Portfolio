'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { NeuralGraph } from './NeuralGraph';
import { NeuralParticles } from './NeuralParticles';
import { useAnimationPause } from '@/components/providers/AnimationPauseProvider';

interface SceneWrapperProps {
  paused: boolean;
}

function SceneWrapper({ paused }: SceneWrapperProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (paused || !groupRef.current) return;
    // Ambient Y-axis auto-rotation (0.002 rad/frame at 60fps)
    const timeScale = Math.min(delta * 60, 2.0);
    groupRef.current.rotation.y += 0.002 * timeScale;
  });

  return (
    <group ref={groupRef}>
      <NeuralGraph paused={paused} />
      <NeuralParticles paused={paused} />
    </group>
  );
}

// Explicit cleanup utility to dispose of memory on Canvas unmount
function SceneDisposer() {
  const { scene } = useThree();

  useEffect(() => {
    return () => {
      // Traverse scene graph to dispose of geometries and materials
      scene.traverse((object) => {
        if (!(object instanceof THREE.Object3D)) return;

        // Dispose BufferGeometries
        if ('geometry' in object) {
          const geom = object.geometry as THREE.BufferGeometry;
          if (geom && typeof geom.dispose === 'function') {
            geom.dispose();
          }
        }

        // Dispose Materials
        if ('material' in object) {
          const mat = object.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              if (m && typeof m.dispose === 'function') m.dispose();
            });
          } else if (mat && typeof mat.dispose === 'function') {
            mat.dispose();
          }
        }
      });
    };
  }, [scene]);

  return null;
}

export function NeuralCore3D() {
  const { isPaused } = useAnimationPause();
  // Start with a stable device pixel ratio of 1.0, scale up dynamically based on GPU performance
  const [dpr, setDpr] = useState(1);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />

        {/* Scalability monitor adjusts canvas DPR on frames drop */}
        <PerformanceMonitor
          onDecline={() => setDpr(1.0)}
          onIncline={() => setDpr(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1.5, 1.75))}
        />

        {/* Renders nodes, edges, and background particles */}
        <SceneWrapper paused={isPaused} />

        {/* Scene-level garbage collection safeguard */}
        <SceneDisposer />
      </Canvas>
    </div>
  );
}

export default NeuralCore3D;
