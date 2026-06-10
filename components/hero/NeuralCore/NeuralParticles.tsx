'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getHardwareLevel } from '@/lib/three/threeUtils';
import { useTheme } from '@/components/providers/ThemeProvider';

interface NeuralParticlesProps {
  paused?: boolean;
}

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  count: number;
}

// Move particle generation math outside the React component to enforce render purity
function initializeParticles(): ParticleData {
  const hardware = getHardwareLevel();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  let count = 800; // Medium default
  if (isMobile || hardware === 'low') {
    count = 0; // Disable particles on low-end or mobile devices
  } else if (hardware === 'high') {
    count = 1500;
  }

  if (count === 0) {
    return { positions: new Float32Array(0), velocities: new Float32Array(0), count: 0 };
  }

  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const radius = 8; // Bounds size of particle field

  for (let i = 0; i < count; i++) {
    // Distribute particles inside a sphere volume
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * Math.cbrt(Math.random());

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);

    // Low drift velocity coefficients
    vel[i * 3] = (Math.random() - 0.5) * 0.01;
    vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
  }

  return { positions: pos, velocities: vel, count };
}

export function NeuralParticles({ paused = false }: NeuralParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Initialize state once lazily during initial mounting
  const [particleData] = useState<ParticleData>(() => initializeParticles());
  
  // Store velocities in a ref for frame-by-frame updates without render reads
  const velocitiesRef = useRef<Float32Array>(particleData.velocities);

  useFrame((state, delta) => {
    const { count } = particleData;
    if (paused || count === 0 || !pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    
    if (!posAttr) return;

    const posArr = posAttr.array as Float32Array;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      // Drift particles smoothly scaled by delta time
      posArr[i * 3] += velocities[i * 3] * delta * 60;
      posArr[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      posArr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

      // Retain particles within a bounding sphere of radius 10
      const x = posArr[i * 3];
      const y = posArr[i * 3 + 1];
      const z = posArr[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);

      if (dist > 10) {
        // Recycle particles back to the center sphere with a low speed
        posArr[i * 3] = (Math.random() - 0.5) * 2;
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 2;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
    }

    posAttr.needsUpdate = true;
  });

  if (particleData.count === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={isDark ? "#00f5a0" : "#0d9488"}
        size={0.03}
        sizeAttenuation={true}
        transparent={true}
        opacity={isDark ? 0.4 : 0.55}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export default NeuralParticles;
