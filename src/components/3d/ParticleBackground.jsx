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

    // Mouse coordinates with smooth interpolation
    const mouse = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
      radius: 190
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (mouse.x === null) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNetwork();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Floating Code Glyphs
    const glyphs = ['<AI />', '0x7F', 'async', 'λ', 'git', 'RAG', 'NIDS', 'Ollama', '=>', '{ }', 'fn()', '01'];
    const floatingGlyphs = Array.from({ length: 16 }, () => ({
      text: glyphs[Math.floor(Math.random() * glyphs.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.18 + Math.random() * 0.3,
      size: 11 + Math.random() * 3,
      opacity: 0.04 + Math.random() * 0.05
    }));

    // Neural Nodes & Dynamic Network
    let nodes = [];
    let packets = [];
    const maxNodes = Math.min(Math.floor((width * height) / 15000), 85);
    const maxDistance = 145;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.baseRadius = Math.random() * 1.8 + 1.2;
        this.color = Math.random() > 0.4 ? '#00f2fe' : '#a855f7';
        this.pulse = Math.random() * Math.PI * 2;
        this.flash = 0; // Triggered when a packet arrives
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.035;

        if (this.flash > 0) {
          this.flash -= 0.04;
          if (this.flash < 0) this.flash = 0;
        }

        // Bounce off canvas edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle repulsion from cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.6;
            this.y -= Math.sin(angle) * force * 1.6;
          }
        }
      }

      draw() {
        const radius = this.baseRadius + Math.sin(this.pulse) * 0.4 + this.flash * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.5, radius), 0, Math.PI * 2);

        if (this.flash > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
        } else {
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Traveling Data Packet (Photons on lines)
    class Packet {
      constructor(fromNode, toNode) {
        this.from = fromNode;
        this.to = toNode;
        this.progress = 0;
        this.speed = 0.015 + Math.random() * 0.02;
        this.color = Math.random() > 0.5 ? '#00f2fe' : '#38bdf8';
        this.size = Math.random() * 1.6 + 1.4;
      }

      update() {
        this.progress += this.speed;
        return this.progress < 1;
      }

      draw() {
        const currX = this.from.x + (this.to.x - this.from.x) * this.progress;
        const currY = this.from.y + (this.to.y - this.from.y) * this.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(currX, currY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();

        // Subtle spark tail
        const tailProgress = Math.max(0, this.progress - 0.08);
        const tailX = this.from.x + (this.to.x - this.from.x) * tailProgress;
        const tailY = this.from.y + (this.to.y - this.from.y) * tailProgress;
        ctx.beginPath();
        ctx.moveTo(currX, currY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }
    }

    const initNetwork = () => {
      nodes = [];
      packets = [];
      for (let i = 0; i < maxNodes; i++) {
        nodes.push(new Node());
      }
    };

    initNetwork();

    // Perspective Cyber Grid at the Bottom
    let gridOffset = 0;
    const drawPerspectiveHorizon = () => {
      gridOffset = (gridOffset + 0.35) % 40;
      const horizonY = height * 0.84;
      const gridDepth = height - horizonY;

      ctx.save();

      // Horizon neon haze
      const horizonGlow = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 40);
      horizonGlow.addColorStop(0, 'transparent');
      horizonGlow.addColorStop(0.5, 'rgba(0, 242, 254, 0.04)');
      horizonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 20, width, 60);

      // Horizontal lines with exponential perspective spacing
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;

      for (let y = horizonY; y < height; y += 12) {
        const progress = (y - horizonY) / gridDepth;
        const lineY = horizonY + Math.pow(progress, 1.8) * gridDepth;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }

      // Converging perspective lines
      const centerX = width / 2;
      const rays = 26;
      for (let i = -rays; i <= rays; i++) {
        const bottomX = centerX + (i * (width / rays)) * 1.35;
        ctx.beginPath();
        ctx.moveTo(centerX + (i * 10), horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.targetX !== null) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // 1. Deep Space Cybernetic Canvas Gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.25, height * 0.2, 50,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, '#0a1026');
      bgGrad.addColorStop(0.45, '#050814');
      bgGrad.addColorStop(1, '#020409');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Cyber Aura (Cyan Top-Right, Violet Bottom-Left)
      const cyanAura = ctx.createRadialGradient(width * 0.85, height * 0.18, 0, width * 0.85, height * 0.18, 480);
      cyanAura.addColorStop(0, 'rgba(0, 242, 254, 0.06)');
      cyanAura.addColorStop(1, 'transparent');
      ctx.fillStyle = cyanAura;
      ctx.fillRect(0, 0, width, height);

      const purpleAura = ctx.createRadialGradient(width * 0.12, height * 0.78, 0, width * 0.12, height * 0.78, 460);
      purpleAura.addColorStop(0, 'rgba(168, 85, 247, 0.05)');
      purpleAura.addColorStop(1, 'transparent');
      ctx.fillStyle = purpleAura;
      ctx.fillRect(0, 0, width, height);

      // 3. Magnetic Cursor Aurora & Reactive Light Ring
      if (mouse.x !== null && mouse.y !== null) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        cursorGlow.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
        cursorGlow.addColorStop(0.6, 'rgba(79, 172, 254, 0.03)');
        cursorGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Floating Developer Code Glyphs
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

      // 5. Draw Perspective Cyber Grid
      drawPerspectiveHorizon();

      // 6. Update Nodes & Active Connections
      const activePairs = [];

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();

        // Connect with other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            activePairs.push({ from: nodes[i], to: nodes[j] });
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect directly to cursor
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
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // 7. Spawn & Update Data Packets (Energy Pulses on Lines)
      if (activePairs.length > 0 && packets.length < 18 && Math.random() < 0.08) {
        const randomPair = activePairs[Math.floor(Math.random() * activePairs.length)];
        // Randomize direction
        if (Math.random() > 0.5) {
          packets.push(new Packet(randomPair.from, randomPair.to));
        } else {
          packets.push(new Packet(randomPair.to, randomPair.from));
        }
      }

      // Animate all traveling packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const packet = packets[k];
        packet.draw();
        const alive = packet.update();
        if (!alive) {
          // Packet arrived at destination
          packet.to.flash = 0.8;
          packets.splice(k, 1);
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
