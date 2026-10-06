import { useEffect, useRef } from 'react';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * Modern Kinetic Ambient Mesh & Radiant Light Waves Background
 * Ultra-modern, premium backdrop inspired by Vercel & Linear:
 * - Multi-layer fluid radiant blooms with organic harmonic oscillation
 * - Ambient kinetic light streams and bezier wave sweeps
 * - Responsive interactive cursor illumination with smooth spring damping
 * - Zero noisy dots or distracting particles: pristine, aesthetic, 60fps hardware-accelerated
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with spring damping
    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      active: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width * 0.5;
      mouse.targetY = height * 0.35;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Kinetic Light Waves
    const waves = [
      { y: 0.25, amplitude: 45, frequency: 0.0018, speed: 0.0008, colorDark: 'rgba(6, 182, 212, 0.07)', colorLight: 'rgba(2, 132, 199, 0.05)' },
      { y: 0.55, amplitude: 60, frequency: 0.0012, speed: -0.0006, colorDark: 'rgba(139, 92, 246, 0.06)', colorLight: 'rgba(124, 58, 237, 0.04)' },
      { y: 0.80, amplitude: 50, frequency: 0.0015, speed: 0.0007, colorDark: 'rgba(16, 185, 129, 0.05)', colorLight: 'rgba(5, 150, 105, 0.035)' }
    ];

    // Dynamic Radiant Blooms
    const blooms = [
      {
        baseX: 0.22,
        baseY: 0.22,
        radiusMult: 0.52,
        vx: 0.0007,
        vy: 0.0009,
        angleX: 0,
        angleY: 1.2,
        colorDark: 'rgba(6, 182, 212, 0.16)', // Electric Cyan
        colorLight: 'rgba(56, 189, 248, 0.10)' // Sky
      },
      {
        baseX: 0.78,
        baseY: 0.28,
        radiusMult: 0.58,
        vx: 0.0009,
        vy: 0.0006,
        angleX: 2.1,
        angleY: 0.8,
        colorDark: 'rgba(139, 92, 246, 0.14)', // Cosmic Violet
        colorLight: 'rgba(129, 140, 248, 0.09)' // Lavender Iris
      },
      {
        baseX: 0.50,
        baseY: 0.72,
        radiusMult: 0.48,
        vx: 0.0008,
        vy: 0.0011,
        angleX: 3.5,
        angleY: 2.6,
        colorDark: 'rgba(79, 70, 229, 0.13)', // Deep Indigo
        colorLight: 'rgba(52, 211, 153, 0.07)' // Fresh Mint
      },
      {
        baseX: 0.15,
        baseY: 0.85,
        radiusMult: 0.42,
        vx: 0.0011,
        vy: 0.0008,
        angleX: 1.4,
        angleY: 3.1,
        colorDark: 'rgba(16, 185, 129, 0.10)', // Emerald
        colorLight: 'rgba(244, 114, 182, 0.06)' // Rose blush
      }
    ];

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse interpolation with easing
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Base Gradient Canvas Fill
      const baseGradient = ctx.createLinearGradient(0, 0, width, height);
      if (isLight) {
        baseGradient.addColorStop(0, '#f8fafc');
        baseGradient.addColorStop(0.5, '#f1f5f9');
        baseGradient.addColorStop(1, '#f8fafc');
      } else {
        baseGradient.addColorStop(0, '#060913');
        baseGradient.addColorStop(0.5, '#090e22');
        baseGradient.addColorStop(1, '#060913');
      }
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Radiant Blooms
      blobsLoop: for (let i = 0; i < blooms.length; i++) {
        const b = blooms[i];
        b.angleX += b.vx;
        b.angleY += b.vy;

        const currentX = width * b.baseX + Math.sin(b.angleX) * (width * 0.12);
        const currentY = height * b.baseY + Math.cos(b.angleY) * (height * 0.10);
        const radius = Math.min(width, height) * b.radiusMult;

        const radGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          radius
        );

        const color = isLight ? b.colorLight : b.colorDark;
        radGrad.addColorStop(0, color);
        radGrad.addColorStop(0.55, color.replace(/[\d.]+\)$/, isLight ? '0.03)' : '0.05)'));
        radGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render Smooth Kinetic Light Streams (Bezier Undulations)
      for (let i = 0; i < waves.length; i++) {
        const w = waves[i];
        const waveBaseY = height * w.y;
        const color = isLight ? w.colorLight : w.colorDark;

        ctx.beginPath();
        ctx.moveTo(0, waveBaseY);

        for (let x = 0; x <= width; x += 24) {
          const sine = Math.sin(x * w.frequency + time * 1.5 + i);
          const cosine = Math.cos(x * w.frequency * 0.5 + time * 0.8);
          const y = waveBaseY + (sine + cosine) * w.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, waveBaseY - w.amplitude, 0, waveBaseY + w.amplitude * 2);
        waveGrad.addColorStop(0, color);
        waveGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = waveGrad;
        ctx.fill();
      }

      // 4. Interactive Cursor Illumination Spotlight
      if (mouse.x !== null && mouse.y !== null) {
        const cursorRadius = Math.min(width * 0.35, 340);
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          cursorRadius
        );

        const spotlightColor = isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(0, 242, 254, 0.12)';
        cursorGlow.addColorStop(0, spotlightColor);
        cursorGlow.addColorStop(0.5, spotlightColor.replace(/[\d.]+\)$/, isLight ? '0.02)' : '0.04)'));
        cursorGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, cursorRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease'
      }}
    />
  );
};

export default ParticleBackground;
