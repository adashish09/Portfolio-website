import { useRef, useEffect } from 'react';

/**
 * TiltCard: Hardware-accelerated 3D Perspective Tilt with Dynamic Light Sheen
 * Uses direct DOM manipulation & requestAnimationFrame for buttery-smooth 60/120fps performance
 * with ZERO React re-render lag or frame drops.
 */
const TiltCard = ({
  children,
  className = '',
  style = {},
  maxTilt = 6,
  scale = 1.015,
  perspective = 1000,
  glare = true
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let isHovered = false;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetGlareX = 50;
    let targetGlareY = 50;

    let currentRotateX = 0;
    let currentRotateY = 0;

    const updateTilt = () => {
      // Smooth interpolation for spring-like tilt
      currentRotateX += (targetRotateX - currentRotateX) * 0.15;
      currentRotateY += (targetRotateY - currentRotateY) * 0.15;

      if (card) {
        card.style.transform = `perspective(${perspective}px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(${isHovered ? scale : 1}, ${isHovered ? scale : 1}, 1)`;
      }

      if (glare && glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${targetGlareX}% ${targetGlareY}%, rgba(255, 255, 255, 0.14) 0%, transparent 65%)`;
        glareRef.current.style.opacity = isHovered ? '1' : '0';
      }

      if (isHovered || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
        rafId.current = requestAnimationFrame(updateTilt);
      }
    };

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRotateX = ((y - centerY) / centerY) * -maxTilt;
      targetRotateY = ((x - centerX) / centerX) * maxTilt;

      targetGlareX = ((x / rect.width) * 100).toFixed(1);
      targetGlareY = ((y / rect.height) * 100).toFixed(1);

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateTilt);
      }
    };

    const onMouseEnter = () => {
      isHovered = true;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateTilt);
    };

    const onMouseLeave = () => {
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateTilt);
    };

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [maxTilt, scale, perspective, glare]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      style={{
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        ...style
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="tilt-glare"
          style={{
            opacity: 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
