import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * ParticleBackground: Multi-Dimensional 3D WebGL Background Engine
 * Enhanced with:
 * 1. Matrix Terminal: Authentic falling digital binary rain (0s and 1s glyphs)
 * 2. Cosmic Cyber: Clean, deep celestial starfield with radiant nebula aura (Zero text-interfering lines or vortex)
 * 3. Mobile & Tablet Touch Protection: Click ripples completely disabled on touch devices to prevent scroll interference
 * 4. Silky-Smooth 60/120fps hardware acceleration with performance.now() delta timing
 */
const ParticleBackground = () => {
  const containerRef = useRef(null);
  const { mode } = useThemeMode();
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper: Check if current device is mobile, tablet, or touch-first
    const isTouchOrMobile = () => {
      return (
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024
      );
    };

    // --- 1. Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2200);
    camera.position.z = 420;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Mouse coordinates tracking with spring easing & velocity
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      worldPos: new THREE.Vector3(0, 0, 0),
      isDown: false
    };

    const handlePointerMove = (e) => {
      const newTargetX = (e.clientX / window.innerWidth) * 2 - 1;
      const newTargetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.vx = newTargetX - mouse.targetX;
      mouse.vy = newTargetY - mouse.targetY;
      mouse.targetX = newTargetX;
      mouse.targetY = newTargetY;
    };

    const handlePointerDown = (e) => {
      mouse.isDown = true;
      // Disable click animation on mobile & tablet devices so scrolling is never interrupted
      if (e.pointerType === 'touch' || e.pointerType === 'pen' || isTouchOrMobile()) {
        return;
      }
      triggerClickRipple();
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // Handle Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Circular Particle Texture Generator
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Soft Glowing Cosmic Nebula Cloud Texture Generator
    const createNebulaTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
      grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.15)');
      grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Matrix Binary Glyphs Texture Generator (0 and 1)
    const createBinaryTexture = (char) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 64, 64);

      ctx.font = 'bold 44px "JetBrains Mono", Consolas, "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Neon emerald green glow
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#a7f3d0';
      ctx.fillText(char, 32, 32);

      // Sharp core
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#00ff88';
      ctx.fillText(char, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();
    const nebulaTexture = createNebulaTexture();
    const zeroTexture = createBinaryTexture('0');
    const oneTexture = createBinaryTexture('1');

    // =========================================================================
    // UNIVERSE 1: COSMIC CYBER (Clean Deep Starfield & Subtle Celestial Nebula)
    // Removed all criss-crossing lines and distracting vortex to ensure clear reading
    // =========================================================================
    const cosmicGroup = new THREE.Group();
    scene.add(cosmicGroup);

    // Primary Cyan Stars
    const cosmicCyanCount = 280;
    const cosmicCyanPositions = new Float32Array(cosmicCyanCount * 3);
    const cosmicCyanVelocities = [];

    for (let i = 0; i < cosmicCyanCount; i++) {
      const px = (Math.random() - 0.5) * 1100;
      const py = (Math.random() - 0.5) * 850;
      const pz = (Math.random() - 0.5) * 600;
      cosmicCyanPositions[i * 3] = px;
      cosmicCyanPositions[i * 3 + 1] = py;
      cosmicCyanPositions[i * 3 + 2] = pz;
      cosmicCyanVelocities.push({
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.6 + Math.random() * 1.2
      });
    }

    const cosmicCyanGeometry = new THREE.BufferGeometry();
    cosmicCyanGeometry.setAttribute('position', new THREE.BufferAttribute(cosmicCyanPositions, 3));

    const cosmicCyanMaterial = new THREE.PointsMaterial({
      size: 4.2,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      color: 0x00f2fe,
      depthWrite: false
    });

    const cosmicCyanPoints = new THREE.Points(cosmicCyanGeometry, cosmicCyanMaterial);
    cosmicGroup.add(cosmicCyanPoints);

    // Secondary Soft Violet / Indigo Stars (Deeper Layer)
    const cosmicPurpleCount = 180;
    const cosmicPurplePositions = new Float32Array(cosmicPurpleCount * 3);
    const cosmicPurpleVelocities = [];

    for (let i = 0; i < cosmicPurpleCount; i++) {
      const px = (Math.random() - 0.5) * 1200;
      const py = (Math.random() - 0.5) * 900;
      const pz = (Math.random() - 0.5) * 700 - 100;
      cosmicPurplePositions[i * 3] = px;
      cosmicPurplePositions[i * 3 + 1] = py;
      cosmicPurplePositions[i * 3 + 2] = pz;
      cosmicPurpleVelocities.push({
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }

    const cosmicPurpleGeometry = new THREE.BufferGeometry();
    cosmicPurpleGeometry.setAttribute('position', new THREE.BufferAttribute(cosmicPurplePositions, 3));

    const cosmicPurpleMaterial = new THREE.PointsMaterial({
      size: 3.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      color: 0xa855f7,
      depthWrite: false
    });

    const cosmicPurplePoints = new THREE.Points(cosmicPurpleGeometry, cosmicPurpleMaterial);
    cosmicGroup.add(cosmicPurplePoints);

    // Deep Subtle Nebula Clouds (Very soft, zero text interference)
    const nebulaCount = 5;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    for (let i = 0; i < nebulaCount; i++) {
      nebulaPositions[i * 3] = (Math.random() - 0.5) * 800;
      nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      nebulaPositions[i * 3 + 2] = -350 - Math.random() * 200;
    }
    const nebulaGeometry = new THREE.BufferGeometry();
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 220,
      map: nebulaTexture,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const nebulaPoints = new THREE.Points(nebulaGeometry, nebulaMaterial);
    cosmicGroup.add(nebulaPoints);

    // =========================================================================
    // UNIVERSE 2: NEON SYNTHWAVE (3D Cyber Warp Tunnel & Laser Rails)
    // =========================================================================
    const synthwaveGroup = new THREE.Group();
    scene.add(synthwaveGroup);

    // 18 Concentric Neon Octagonal Gate Rings aligned along Z
    const tunnelRings = [];
    const ringCount = 18;
    const tunnelSpacing = 90;

    const createOctagonGeometry = (radius) => {
      const points = [];
      const sides = 8;
      for (let i = 0; i <= sides; i++) {
        const theta = (i / sides) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius * 0.7, 0));
      }
      return new THREE.BufferGeometry().setFromPoints(points);
    };

    for (let i = 0; i < ringCount; i++) {
      const radius = 95 + (i % 2 === 0 ? 0 : 8);
      const ringGeom = createOctagonGeometry(radius);
      const isMagenta = i % 2 === 0;
      const ringMat = new THREE.LineBasicMaterial({
        color: isMagenta ? 0xff2a85 : 0xc026d3,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        linewidth: 2
      });
      const ringMesh = new THREE.Line(ringGeom, ringMat);
      ringMesh.position.z = -i * tunnelSpacing + 200;
      synthwaveGroup.add(ringMesh);
      tunnelRings.push({
        mesh: ringMesh,
        baseZ: ringMesh.position.z,
        index: i
      });
    }

    // High-Speed Laser Rails / Streaks
    const laserCount = 35;
    const laserPositions = new Float32Array(laserCount * 6);
    const laserGeometry = new THREE.BufferGeometry();
    const laserVelocities = [];

    for (let i = 0; i < laserCount; i++) {
      const angle = (i / laserCount) * Math.PI * 2;
      const r = 90 + Math.random() * 20;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r * 0.7;
      const z = -Math.random() * 1200;
      const length = 45 + Math.random() * 70;

      const idx = i * 6;
      laserPositions[idx] = x;
      laserPositions[idx + 1] = y;
      laserPositions[idx + 2] = z;
      laserPositions[idx + 3] = x;
      laserPositions[idx + 4] = y;
      laserPositions[idx + 5] = z + length;

      laserVelocities.push({
        speed: 6.5 + Math.random() * 7.5,
        baseAngle: angle,
        baseR: r
      });
    }

    laserGeometry.setAttribute('position', new THREE.BufferAttribute(laserPositions, 3));

    const laserMaterial = new THREE.LineBasicMaterial({
      color: 0xff2a85,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const laserLines = new THREE.LineSegments(laserGeometry, laserMaterial);
    synthwaveGroup.add(laserLines);

    // Distant Synthwave Cyber Sun / Pulsar at end of tunnel
    const sunGeom = new THREE.RingGeometry(35, 42, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffb800,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const synthSun = new THREE.Mesh(sunGeom, sunMat);
    synthSun.position.set(0, 0, -1500);
    synthwaveGroup.add(synthSun);

    // =========================================================================
    // UNIVERSE 3: MATRIX TERMINAL (Authentic Cascading 0s and 1s Binary Rain)
    // Limited density, slow gentle drift, zero snowflakes or wireframe rings
    // =========================================================================
    const matrixGroup = new THREE.Group();
    scene.add(matrixGroup);

    // Falling '0' Glyphs (Clean, limited density)
    const matrixCount0 = 55;
    const matrixPositions0 = new Float32Array(matrixCount0 * 3);
    const matrixVelocities0 = [];

    for (let i = 0; i < matrixCount0; i++) {
      matrixPositions0[i * 3] = (Math.random() - 0.5) * 1250;
      matrixPositions0[i * 3 + 1] = (Math.random() - 0.5) * 950;
      matrixPositions0[i * 3 + 2] = (Math.random() - 0.5) * 450;
      matrixVelocities0.push({
        fallSpeed: 18 + Math.random() * 22, // Units per second (calm, cinematic drift)
        resetY: 480 + Math.random() * 120,
        originalX: matrixPositions0[i * 3]
      });
    }

    const matrixGeometry0 = new THREE.BufferGeometry();
    matrixGeometry0.setAttribute('position', new THREE.BufferAttribute(matrixPositions0, 3));

    const matrixMaterial0 = new THREE.PointsMaterial({
      size: 16.5,
      map: zeroTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      color: 0x00ff88,
      depthWrite: false
    });

    const matrixPoints0 = new THREE.Points(matrixGeometry0, matrixMaterial0);
    matrixGroup.add(matrixPoints0);

    // Falling '1' Glyphs (Clean, limited density)
    const matrixCount1 = 55;
    const matrixPositions1 = new Float32Array(matrixCount1 * 3);
    const matrixVelocities1 = [];

    for (let i = 0; i < matrixCount1; i++) {
      matrixPositions1[i * 3] = (Math.random() - 0.5) * 1250;
      matrixPositions1[i * 3 + 1] = (Math.random() - 0.5) * 950;
      matrixPositions1[i * 3 + 2] = (Math.random() - 0.5) * 450;
      matrixVelocities1.push({
        fallSpeed: 18 + Math.random() * 22, // Units per second (calm, cinematic drift)
        resetY: 480 + Math.random() * 120,
        originalX: matrixPositions1[i * 3]
      });
    }

    const matrixGeometry1 = new THREE.BufferGeometry();
    matrixGeometry1.setAttribute('position', new THREE.BufferAttribute(matrixPositions1, 3));

    const matrixMaterial1 = new THREE.PointsMaterial({
      size: 16.5,
      map: oneTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      color: 0x34d399,
      depthWrite: false
    });

    const matrixPoints1 = new THREE.Points(matrixGeometry1, matrixMaterial1);
    matrixGroup.add(matrixPoints1);

    // =========================================================================
    // UNIVERSE 4: NORDIC FROST (3D Floating Glass Spheres & Prismatic Dust)
    // =========================================================================
    const frostGroup = new THREE.Group();
    scene.add(frostGroup);

    const frostSpheres = [];
    for (let i = 0; i < 6; i++) {
      const radius = 24 + Math.random() * 26;
      const geom = new THREE.SphereGeometry(radius, 20, 20);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x0284c7 : 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.08 + Math.random() * 0.04
      });
      const sphere = new THREE.Mesh(geom, mat);
      sphere.position.set(
        (Math.random() - 0.5) * 850,
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 350
      );
      sphere.userData = {
        baseX: sphere.position.x,
        baseY: sphere.position.y,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.18,
        rotSpeed: 0.003 + Math.random() * 0.004
      };
      frostGroup.add(sphere);
      frostSpheres.push(sphere);
    }

    // Prismatic Crystalline Dust
    const frostCount = 320;
    const frostPositions = new Float32Array(frostCount * 3);
    for (let i = 0; i < frostCount; i++) {
      frostPositions[i * 3] = (Math.random() - 0.5) * 900;
      frostPositions[i * 3 + 1] = (Math.random() - 0.5) * 700;
      frostPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    const frostGeometry = new THREE.BufferGeometry();
    frostGeometry.setAttribute('position', new THREE.BufferAttribute(frostPositions, 3));

    const frostMaterial = new THREE.PointsMaterial({
      size: 4,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      color: 0x0ea5e9,
      depthWrite: false
    });
    const frostPoints = new THREE.Points(frostGeometry, frostMaterial);
    frostGroup.add(frostPoints);

    // =========================================================================
    // INTERACTIVE CLICK RIPPLE WAVE SHOCKWAVE (Desktop Mouse Only)
    // =========================================================================
    const clickRipples = [];
    const triggerClickRipple = () => {
      const ripGeom = new THREE.RingGeometry(5, 7, 32);
      const ripMat = new THREE.MeshBasicMaterial({
        color:
          modeRef.current === 'synthwave'
            ? 0xff2a85
            : modeRef.current === 'matrix'
            ? 0x00ff88
            : modeRef.current === 'light'
            ? 0x0284c7
            : 0x00f2fe,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ripple = new THREE.Mesh(ripGeom, ripMat);
      ripple.position.set(mouse.worldPos.x, mouse.worldPos.y, 20);
      scene.add(ripple);
      clickRipples.push({ mesh: ripple, scale: 1, opacity: 0.85 });
    };

    // =========================================================================
    // FADE-AWAY & ROLL-IN THEME TRANSITION CONTROLLER
    // =========================================================================
    const weights = {
      dark: modeRef.current === 'dark' ? 1.0 : 0.0,
      synthwave: modeRef.current === 'synthwave' ? 1.0 : 0.0,
      matrix: modeRef.current === 'matrix' ? 1.0 : 0.0,
      light: modeRef.current === 'light' ? 1.0 : 0.0
    };

    const rollStates = {
      dark: { rollY: 0, scale: 1 },
      synthwave: { rollY: 0, scale: 1 },
      matrix: { rollY: 0, scale: 1 },
      light: { rollY: 0, scale: 1 }
    };

    const applyGroupWeightAndRoll = (group, weight, key) => {
      group.visible = weight > 0.008;
      if (!group.visible) return;

      const state = rollStates[key];
      group.position.y = state.rollY;
      group.scale.set(state.scale, state.scale, state.scale);

      group.traverse((child) => {
        if (child.material) {
          if (!child.userData.baseOpacity) {
            child.userData.baseOpacity = child.material.opacity || 1.0;
          }
          child.material.opacity = child.userData.baseOpacity * weight;
        }
      });
    };

    // Initialize visibility
    applyGroupWeightAndRoll(cosmicGroup, weights.dark, 'dark');
    applyGroupWeightAndRoll(synthwaveGroup, weights.synthwave, 'synthwave');
    applyGroupWeightAndRoll(matrixGroup, weights.matrix, 'matrix');
    applyGroupWeightAndRoll(frostGroup, weights.light, 'light');

    // =========================================================================
    // MAIN 60FPS / 120FPS HARDWARE-ACCELERATED ANIMATION LOOP
    // =========================================================================
    let animationFrameId;
    let lastTime = performance.now();
    let previousMode = modeRef.current;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsedTime = now / 1000;

      // Smooth mouse spring interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Project mouse into 3D world space
      mouse.worldPos.set(mouse.x * 320, mouse.y * 220, 0);

      // --- DEEP 3D MOUSE PARALLAX (Subtle & Clean) ---
      camera.position.x = mouse.x * 70;
      camera.position.y = mouse.y * 55;
      scene.rotation.y = mouse.x * 0.08;
      scene.rotation.x = -mouse.y * 0.06;

      // --- FADE-AWAY & ROLL-IN THEME INTERPOLATION ---
      const activeMode = modeRef.current;

      if (activeMode !== previousMode) {
        rollStates[activeMode].scale = 0.90;
        rollStates[activeMode].rollY = -35;
        previousMode = activeMode;
      }

      ['dark', 'synthwave', 'matrix', 'light'].forEach((key) => {
        const isActive = activeMode === key;
        const targetWeight = isActive ? 1.0 : 0.0;
        weights[key] += (targetWeight - weights[key]) * 0.085;

        rollStates[key].scale += (1.0 - rollStates[key].scale) * 0.08;
        rollStates[key].rollY += (0.0 - rollStates[key].rollY) * 0.08;
      });

      applyGroupWeightAndRoll(cosmicGroup, weights.dark, 'dark');
      applyGroupWeightAndRoll(synthwaveGroup, weights.synthwave, 'synthwave');
      applyGroupWeightAndRoll(matrixGroup, weights.matrix, 'matrix');
      applyGroupWeightAndRoll(frostGroup, weights.light, 'light');

      // --- ANIMATE UNIVERSE 1: COSMIC CYBER (Clean Starfield & Subtle Nebula Drift) ---
      // Distraction-free, zero lines cutting across text
      if (cosmicGroup.visible) {
        // 1. Primary Cyan Stars Drift
        const cyanPos = cosmicCyanGeometry.attributes.position.array;
        for (let i = 0; i < cosmicCyanCount; i++) {
          const idx = i * 3;
          cyanPos[idx] += cosmicCyanVelocities[i].vx;
          cyanPos[idx + 1] += cosmicCyanVelocities[i].vy;

          if (Math.abs(cyanPos[idx]) > 550) cosmicCyanVelocities[i].vx *= -1;
          if (Math.abs(cyanPos[idx + 1]) > 425) cosmicCyanVelocities[i].vy *= -1;
        }
        cosmicCyanGeometry.attributes.position.needsUpdate = true;

        // 2. Secondary Violet Stars Drift
        const purpPos = cosmicPurpleGeometry.attributes.position.array;
        for (let i = 0; i < cosmicPurpleCount; i++) {
          const idx = i * 3;
          purpPos[idx] += cosmicPurpleVelocities[i].vx;
          purpPos[idx + 1] += cosmicPurpleVelocities[i].vy;

          if (Math.abs(purpPos[idx]) > 600) cosmicPurpleVelocities[i].vx *= -1;
          if (Math.abs(purpPos[idx + 1]) > 450) cosmicPurpleVelocities[i].vy *= -1;
        }
        cosmicPurpleGeometry.attributes.position.needsUpdate = true;

        // Gentle celestial drift
        cosmicGroup.rotation.y = elapsedTime * 0.012;
        nebulaPoints.rotation.z = elapsedTime * 0.006;
      }

      // --- ANIMATE UNIVERSE 2: NEON SYNTHWAVE (3D Cyber Warp Tunnel & Steering) ---
      if (synthwaveGroup.visible) {
        tunnelRings.forEach((ringItem, idx) => {
          ringItem.mesh.position.z += 2.2;
          if (ringItem.mesh.position.z > 350) {
            ringItem.mesh.position.z = -ringCount * tunnelSpacing + 350;
          }

          const depthFactor = idx / ringCount;
          ringItem.mesh.position.x = mouse.x * (depthFactor * 120) + Math.sin(elapsedTime * 1.5 + idx * 0.3) * 6;
          ringItem.mesh.position.y = mouse.y * (depthFactor * 90) + Math.cos(elapsedTime * 1.5 + idx * 0.3) * 5;
          ringItem.mesh.rotation.z = elapsedTime * 0.2 + idx * 0.05;
        });

        const laserPos = laserGeometry.attributes.position.array;
        for (let i = 0; i < laserCount; i++) {
          const idx = i * 6;
          const vel = laserVelocities[i];
          laserPos[idx + 2] += vel.speed;
          laserPos[idx + 5] += vel.speed;

          if (laserPos[idx + 2] > 380) {
            const z = -1200 - Math.random() * 300;
            laserPos[idx + 2] = z;
            laserPos[idx + 5] = z + 65;
          }

          laserPos[idx] = Math.cos(vel.baseAngle) * vel.baseR + mouse.x * 40;
          laserPos[idx + 1] = Math.sin(vel.baseAngle) * (vel.baseR * 0.7) + mouse.y * 30;
          laserPos[idx + 3] = laserPos[idx];
          laserPos[idx + 4] = laserPos[idx + 1];
        }
        laserGeometry.attributes.position.needsUpdate = true;

        synthSun.position.x = mouse.x * 60;
        synthSun.position.y = mouse.y * 45;
        synthSun.rotation.z = elapsedTime * 0.3;
      }

      // --- ANIMATE UNIVERSE 3: MATRIX TERMINAL (Cascading 0s and 1s Binary Rain) ---
      if (matrixGroup.visible) {
        // Animate '0's (Gentle delta-timed drift)
        const pos0 = matrixGeometry0.attributes.position.array;
        for (let i = 0; i < matrixCount0; i++) {
          const idx = i * 3;
          pos0[idx + 1] -= matrixVelocities0[i].fallSpeed * delta;

          // Subtle cursor wake: push binary numerals aside horizontally
          const dx = pos0[idx] - mouse.worldPos.x;
          const dy = pos0[idx + 1] - mouse.worldPos.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 15000 && distSq > 30) {
            const push = (1 - distSq / 15000) * 1.5;
            pos0[idx] += (dx / Math.sqrt(distSq)) * push;
          }

          if (pos0[idx + 1] < -470) {
            pos0[idx + 1] = matrixVelocities0[i].resetY;
            pos0[idx] = matrixVelocities0[i].originalX;
          }
        }
        matrixGeometry0.attributes.position.needsUpdate = true;

        // Animate '1's (Gentle delta-timed drift)
        const pos1 = matrixGeometry1.attributes.position.array;
        for (let i = 0; i < matrixCount1; i++) {
          const idx = i * 3;
          pos1[idx + 1] -= matrixVelocities1[i].fallSpeed * delta;

          const dx = pos1[idx] - mouse.worldPos.x;
          const dy = pos1[idx + 1] - mouse.worldPos.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 15000 && distSq > 30) {
            const push = (1 - distSq / 15000) * 1.5;
            pos1[idx] += (dx / Math.sqrt(distSq)) * push;
          }

          if (pos1[idx + 1] < -470) {
            pos1[idx + 1] = matrixVelocities1[i].resetY;
            pos1[idx] = matrixVelocities1[i].originalX;
          }
        }
        matrixGeometry1.attributes.position.needsUpdate = true;
      }

      // --- ANIMATE UNIVERSE 4: NORDIC FROST (Glass Orbs & Crystalline Dust) ---
      if (frostGroup.visible) {
        frostSpheres.forEach((sphere) => {
          sphere.rotation.x += sphere.userData.rotSpeed;
          sphere.rotation.y += sphere.userData.rotSpeed * 1.2;

          const dx = sphere.position.x - mouse.worldPos.x;
          const dy = sphere.position.y - mouse.worldPos.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 28000 && distSq > 100) {
            sphere.position.x += (dx / Math.sqrt(distSq)) * 1.5;
            sphere.position.y += (dy / Math.sqrt(distSq)) * 1.5;
          }

          sphere.position.x += Math.sin(elapsedTime * 0.5) * 0.2;
          sphere.position.y += Math.cos(elapsedTime * 0.6) * 0.2;
        });

        const frostPos = frostGeometry.attributes.position.array;
        for (let i = 0; i < frostCount; i++) {
          const idx = i * 3;
          frostPos[idx + 1] += Math.sin(elapsedTime + i) * 0.15;
          if (i < 30) {
            const angle = elapsedTime * 1.2 + i * 0.2;
            frostPos[idx] = mouse.worldPos.x + Math.cos(angle) * (40 + i * 2);
            frostPos[idx + 1] = mouse.worldPos.y + Math.sin(angle) * (30 + i * 1.5);
          }
        }
        frostGeometry.attributes.position.needsUpdate = true;
      }

      // --- ANIMATE CLICK RIPPLES (Desktop Mouse Only) ---
      for (let i = clickRipples.length - 1; i >= 0; i--) {
        const rip = clickRipples[i];
        rip.scale += 2.5;
        rip.mesh.scale.set(rip.scale, rip.scale, 1);
        rip.opacity -= 0.035;
        rip.mesh.material.opacity = Math.max(0, rip.opacity);
        if (rip.opacity <= 0) {
          scene.remove(rip.mesh);
          rip.mesh.geometry.dispose();
          rip.mesh.material.dispose();
          clickRipples.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Dispose Cosmic assets
      cosmicCyanGeometry.dispose();
      cosmicCyanMaterial.dispose();
      cosmicPurpleGeometry.dispose();
      cosmicPurpleMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      nebulaTexture.dispose();

      // Dispose Synthwave assets
      tunnelRings.forEach((r) => {
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
      });
      laserGeometry.dispose();
      laserMaterial.dispose();
      sunGeom.dispose();
      sunMat.dispose();

      // Dispose Matrix assets
      matrixGeometry0.dispose();
      matrixMaterial0.dispose();
      matrixGeometry1.dispose();
      matrixMaterial1.dispose();
      zeroTexture.dispose();
      oneTexture.dispose();

      // Dispose Frost assets
      frostSpheres.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
      });
      frostGeometry.dispose();
      frostMaterial.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;

