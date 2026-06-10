'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildNodePositions } from '@/lib/three/threeUtils';

interface NeuralGraphProps {
  paused?: boolean;
}

interface GraphData {
  initialPositions: Float32Array;
  currentPositions: Float32Array;
  velocities: Float32Array;
  edgeIndices: Int32Array;
  initialLinePositions: Float32Array;
}

// Generate all graph topology and matrices outside of the render call
function initializeGraph(count: number): GraphData {
  const initPos = buildNodePositions(count, 4.0);
  const currPos = new Float32Array(initPos.length);
  currPos.set(initPos);
  const vels = new Float32Array(count * 3);

  // Pre-compute close-node indices to draw connections
  const indices: number[] = [];
  const maxDistance = 1.95; // threshold distance to create an edge

  for (let i = 0; i < count; i++) {
    const x1 = initPos[i * 3];
    const y1 = initPos[i * 3 + 1];
    const z1 = initPos[i * 3 + 2];

    for (let j = i + 1; j < count; j++) {
      const x2 = initPos[j * 3];
      const y2 = initPos[j * 3 + 1];
      const z2 = initPos[j * 3 + 2];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dz = z2 - z1;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDistance) {
        indices.push(i, j);
      }
    }
  }
  const edgeIdxs = new Int32Array(indices);

  // Initialize LineSegment positions buffer
  const initialLinePos = new Float32Array(edgeIdxs.length * 3);
  let lineIdx = 0;
  for (let k = 0; k < edgeIdxs.length; k++) {
    const nodeIdx = edgeIdxs[k];
    initialLinePos[lineIdx++] = initPos[nodeIdx * 3];
    initialLinePos[lineIdx++] = initPos[nodeIdx * 3 + 1];
    initialLinePos[lineIdx++] = initPos[nodeIdx * 3 + 2];
  }

  return {
    initialPositions: initPos,
    currentPositions: currPos,
    velocities: vels,
    edgeIndices: edgeIdxs,
    initialLinePositions: initialLinePos,
  };
}

export function NeuralGraph({ paused = false }: NeuralGraphProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const count = 60;

  // Initialize graph data once lazily in state
  const [graphData] = useState<GraphData>(() => initializeGraph(count));

  // Access velocities and currentPositions in refs for frame-by-frame updates without render reads
  const currentPositionsRef = useRef<Float32Array>(graphData.currentPositions);
  const velocitiesRef = useRef<Float32Array>(graphData.velocities);

  // Single Object3D reused to write instance matrices without garbage collection overhead
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (paused || !meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const raycaster = state.raycaster;

    // Raycast intersection on virtual plane z = 0 (graph layer)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);

    // Physics parameters for cursor interaction and springs
    const repulsionRadius = 2.0;
    const repulsionStrength = 0.55;
    const springDamping = 0.12;
    const springStiffness = 0.04;

    const currentPositions = currentPositionsRef.current;
    const velocities = velocitiesRef.current;
    const { initialPositions, edgeIndices } = graphData;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      let cx = currentPositions[idx];
      let cy = currentPositions[idx + 1];
      let cz = currentPositions[idx + 2];

      const bx = initialPositions[idx];
      const by = initialPositions[idx + 1];
      const bz = initialPositions[idx + 2];

      // Proximity vector from pointer target to node
      const dx = cx - target.x;
      const dy = cy - target.y;
      const dz = cz - target.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      let rx = 0;
      let ry = 0;
      let rz = 0;

      if (dist < repulsionRadius && dist > 0.05) {
        // Linear repulsion force ramping down at the border
        const force = (1.0 - dist / repulsionRadius) * repulsionStrength;
        rx = (dx / dist) * force;
        ry = (dy / dist) * force;
        rz = (dz / dist) * force;
      }

      // Spring force returning to baseline
      const sx = (bx - cx) * springStiffness;
      const sy = (by - cy) * springStiffness;
      const sz = (bz - cz) * springStiffness;

      // Update velocities (forces scaled relative to standard 60fps delta)
      const forceScale = Math.min(delta * 60, 2);
      velocities[idx] += (sx + rx) * forceScale;
      velocities[idx + 1] += (sy + ry) * forceScale;
      velocities[idx + 2] += (sz + rz) * forceScale;

      // Apply drag damping
      velocities[idx] *= (1.0 - springDamping);
      velocities[idx + 1] *= (1.0 - springDamping);
      velocities[idx + 2] *= (1.0 - springDamping);

      // Displace position
      cx += velocities[idx];
      cy += velocities[idx + 1];
      cz += velocities[idx + 2];

      currentPositions[idx] = cx;
      currentPositions[idx + 1] = cy;
      currentPositions[idx + 2] = cz;

      // Calculate organic scale pulsation
      const scale = 1.0 + Math.sin(time * 2.5 + i * 0.7) * 0.18;

      dummy.position.set(cx, cy, cz);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connection lines coordinates in buffer attribute
    if (linesRef.current) {
      const lineAttr = linesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      if (lineAttr) {
        const lineArr = lineAttr.array as Float32Array;
        let lineIdx = 0;

        for (let k = 0; k < edgeIndices.length; k++) {
          const nodeIdx = edgeIndices[k];
          lineArr[lineIdx++] = currentPositions[nodeIdx * 3];
          lineArr[lineIdx++] = currentPositions[nodeIdx * 3 + 1];
          lineArr[lineIdx++] = currentPositions[nodeIdx * 3 + 2];
        }

        lineAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* 1. Connection lines segments */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graphData.initialLinePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f5a0"
          transparent={true}
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 2. Nodes instanced spheres */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        castShadow={false}
        receiveShadow={false}
      >
        <sphereGeometry args={[0.075, 8, 8]} />
        <meshBasicMaterial
          color="#00f5a0"
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

export default NeuralGraph;
