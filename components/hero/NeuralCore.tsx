'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import NeuralCoreCSS from './NeuralCoreCSS/NeuralCoreCSS';
import styles from './Hero.module.css';

// Lazy-load the WebGL 3D scene exclusively on the client.
// Displays the animated CSS-based canvas as a skeleton fallback during chunk loading.
const NeuralCore3D = dynamic(
  () => import('./NeuralCore/NeuralCore3D').then((mod) => mod.NeuralCore3D),
  {
    ssr: false,
    loading: () => <NeuralCoreCSS />,
  }
);

// Graceful degradation: handles driver errors, WebGL disabled states, or canvas context crashes
function WebGLFallback({ error }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.warn('WebGL initialization failed or context lost. Degrading to CSS fallback. Error:', errorMessage);
  return <NeuralCoreCSS />;
}

export default function NeuralCore() {
  return (
    <div className={styles.coreWrapper}>
      <ErrorBoundary FallbackComponent={WebGLFallback}>
        <NeuralCore3D />
      </ErrorBoundary>
    </div>
  );
}