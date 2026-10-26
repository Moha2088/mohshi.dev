import { useEffect, useRef } from 'react';
import { createParticleMorph } from './particleMorphEngine';
import './ParticleMorph.css';

export function ParticleMorph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage || !canvas) {
      return;
    }

    const controller = createParticleMorph(canvas, stage);
    return () => controller.dispose();
  }, []);

  return (
    <div ref={stageRef} className="stage">
      <canvas
        ref={canvasRef}
        role="button"
        tabIndex={0}
        aria-label="Hold to form a particle globe"
      />
    </div>
  );
};

