import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 170
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Floating Code Glyphs
    const glyphs = ['{ }', '01', '/>', 'const', '=>', '0x7F', '&&', '::', 'fn()', 'git'];
    const floatingGlyphs = Array.from({ length: 14 }, () => ({
      text: glyphs[Math.floor(Math.random() * glyphs.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.2 + Math.random() * 0.35,
      size: 11 + Math.random() * 4,
      opacity: 0.04 + Math.random() * 0.05
    }));

    // Digital Nodes (Cyber Constellation)
    let nodes = [];
    const nodeCount = Math.min(Math.floor((width * height) / 16000), 90);

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1.2;
        this.baseColor = Math.random() > 0.4 ? '#00f2fe' : '#a855f7';
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.03;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        const currentRadius = this.radius + Math.sin(this.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.baseColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    initNodes();

    // Perspective Cyber Grid at the Bottom
    let gridOffset = 0;
    const drawCyberGrid = () => {
      gridOffset = (gridOffset + 0.3) % 40;
      const horizon = height * 0.82;
      const gridHeight = height - horizon;

      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1;

      // Horizontal moving lines
      for (let y = horizon; y < height; y += 14) {
        const progress = (y - horizon) / gridHeight;
        const currentY = horizon + Math.pow(progress, 1.8) * gridHeight;
        ctx.beginPath();
        ctx.moveTo(0, currentY);
        ctx.lineTo(width, currentY);
        ctx.stroke();
      }

      // Perspective vertical lines converging to horizon center
      const centerX = width / 2;
      const count = 28;
      for (let i = -count; i <= count; i++) {
        const bottomX = centerX + (i * (width / count)) * 1.2;
        ctx.beginPath();
        ctx.moveTo(centerX + (i * 12), horizon);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.2, height * 0.2, 50,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#090f24');
      bgGrad.addColorStop(0.5, '#050813');
      bgGrad.addColorStop(1, '#02040a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient Cyber Glow Orbs
      const cyanGlow = ctx.createRadialGradient(width * 0.85, height * 0.2, 0, width * 0.85, height * 0.2, 450);
      cyanGlow.addColorStop(0, 'rgba(0, 242, 254, 0.05)');
      cyanGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = cyanGlow;
      ctx.fillRect(0, 0, width, height);

      const violetGlow = ctx.createRadialGradient(width * 0.15, height * 0.75, 0, width * 0.15, height * 0.75, 450);
      violetGlow.addColorStop(0, 'rgba(168, 85, 247, 0.04)');
      violetGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = violetGlow;
      ctx.fillRect(0, 0, width, height);

      // Floating Code Glyphs
      ctx.font = '12px "JetBrains Mono", monospace';
      floatingGlyphs.forEach((glyph) => {
        glyph.y -= glyph.speed;
        if (glyph.y < -20) {
          glyph.y = height + 20;
          glyph.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(56, 189, 248, ${glyph.opacity})`;
        ctx.fillText(glyph.text, glyph.x, glyph.y);
      });

      // Draw Cyber Grid on bottom
      drawCyberGrid();

      // Update and connect Nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();

        // Connect with nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};

export default ParticleBackground;
