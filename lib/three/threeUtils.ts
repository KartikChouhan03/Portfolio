export function buildNodePositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Distribute nodes using a volume-uniform random distribution inside a sphere
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    // Use cube root of random value for uniform spatial volume density
    const r = radius * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export function buildEdgeGeometry(positions: Float32Array, maxDistance: number): Float32Array {
  const count = positions.length / 3;
  const edges: number[] = [];

  for (let i = 0; i < count; i++) {
    const x1 = positions[i * 3];
    const y1 = positions[i * 3 + 1];
    const z1 = positions[i * 3 + 2];

    for (let j = i + 1; j < count; j++) {
      const x2 = positions[j * 3];
      const y2 = positions[j * 3 + 1];
      const z2 = positions[j * 3 + 2];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dz = z2 - z1;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDistance) {
        // Add start and end points for a LineSegment
        edges.push(x1, y1, z1);
        edges.push(x2, y2, z2);
      }
    }
  }

  return new Float32Array(edges);
}

export function getHardwareLevel(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'medium';

  // Check hardware concurrency (CPU logical cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check device memory (RAM in GB) if supported by browser
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;

  // Determine capability tier
  if (cores <= 2 || memory <= 2) {
    return 'low';
  } else if (cores >= 8 && memory >= 8) {
    return 'high';
  }
  return 'medium';
}
