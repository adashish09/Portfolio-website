import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * ParticleBackground: Multi-Dimensional 3D WebGL Background Engine
 * Enhanced with:
 * 1. Deep 3D Mouse Interactivity (Cursor Gravitational Vortex, Constellation Tethering, Steering)
 * 2. Brand-New Neon Synthwave 3D Cyber Warp Tunnel & Laser Rails (Replaces old flat wireframe grid)
 * 3. Fade-Away & Roll-In 3D Dimensional Transitions (Smooth scale & position roll-in)
 * 4. Silky-Smooth 60/120fps hardware acceleration with delta clamping
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

    const handlePointerDown = () => {
      mouse.isDown = true;
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
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // =========================================================================
    // UNIVERSE 1: COSMIC CYBER (Interactive Starfield & Cursor Constellation)
    // =========================================================================
    const cosmicGroup = new THREE.Group();
    scene.add(cosmicGroup);

    const cosmicCount = 420;
    const cosmicPositions = new Float32Array(cosmicCount * 3);
    const cosmicVelocities = [];
    const cosmicOriginalPos = [];

    for (let i = 0; i < cosmicCount; i++) {
      const px = (Math.random() - 0.5) * 950;
      const py = (Math.random() - 0.5) * 750;
      const pz = (Math.random() - 0.5) * 600;
      cosmicPositions[i * 3] = px;
      cosmicPositions[i * 3 + 1] = py;
      cosmicPositions[i * 3 + 2] = pz;
      cosmicOriginalPos.push(new THREE.Vector3(px, py, pz));
      cosmicVelocities.push({
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.2
      });
    }

    const cosmicGeometry = new THREE.BufferGeometry();
    cosmicGeometry.setAttribute('position', new THREE.BufferAttribute(cosmicPositions, 3));

    const cosmicMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      color: 0x00f2fe,
      depthWrite: false
    });

    const cosmicPoints = new THREE.Points(cosmicGeometry, cosmicMaterial);
    cosmicGroup.add(cosmicPoints);

    // Dynamic Constellation Connecting Lines (linking nearby stars AND linking to cursor!)
    const maxLines = 260;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });

    const cosmicLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    cosmicGroup.add(cosmicLines);

    // =========================================================================
    // UNIVERSE 2: NEON SYNTHWAVE (3D Cyber Warp Tunnel & Laser Rails)
    // REPLACING the old flat wireframe grid with a high-speed Cyber Tunnel!
    // =========================================================================
    const synthwaveGroup = new THREE.Group();
    scene.add(synthwaveGroup);

    // 16 Concentric Neon Octagonal Gate Rings aligned along Z
    const tunnelRings = [];
    const ringCount = 18;
    const tunnelSpacing = 90;

    // Create Octagonal Gate Geometry
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

    // Distant Synthwave Cyber Sun / Pulsar at the end of tunnel
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
    // UNIVERSE 3: MATRIX TERMINAL (3D Digital Rain & Interactive Telemetry)
    // =========================================================================
    const matrixGroup = new THREE.Group();
    scene.add(matrixGroup);

    const matrixCount = 500;
    const matrixPositions = new Float32Array(matrixCount * 3);
    const matrixVelocities = [];

    for (let i = 0; i < matrixCount; i++) {
      matrixPositions[i * 3] = (Math.random() - 0.5) * 1050;
      matrixPositions[i * 3 + 1] = (Math.random() - 0.5) * 850;
      matrixPositions[i * 3 + 2] = (Math.random() - 0.5) * 550;
      matrixVelocities.push({
        fallSpeed: 1.5 + Math.random() * 2.5,
        resetY: 480 + Math.random() * 150,
        originalX: matrixPositions[i * 3]
      });
    }

    const matrixGeometry = new THREE.BufferGeometry();
    matrixGeometry.setAttribute('position', new THREE.BufferAttribute(matrixPositions, 3));

    const matrixMaterial = new THREE.PointsMaterial({
      size: 5.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      color: 0x00ff88,
      depthWrite: false
    });

    const matrixPoints = new THREE.Points(matrixGeometry, matrixMaterial);
    matrixGroup.add(matrixPoints);

    // 3D Hexagonal / Quantum Telemetry Rings that face the mouse
    const ringGeometry = new THREE.RingGeometry(24, 26, 6);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });

    const matrixRings = [];
    for (let i = 0; i < 6; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(
        (Math.random() - 0.5) * 750,
        (Math.random() - 0.5) * 550,
        (Math.random() - 0.5) * 350
      );
      ring.userData = {
        baseSpin: (Math.random() - 0.5) * 0.015
      };
      matrixGroup.add(ring);
      matrixRings.push(ring);
    }

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
    // INTERACTIVE CLICK RIPPLE WAVE SHOCKWAVE
    // =========================================================================
    const clickRipples = [];
    const triggerClickRipple = () => {
      const ripGeom = new THREE.RingGeometry(5, 7, 32);
      const ripMat = new THREE.MeshBasicMaterial({
        color: modeRef.current === 'synthwave' ? 0xff2a85 : modeRef.current === 'matrix' ? 0x00ff88 : modeRef.current === 'light' ? 0x0284c7 : 0x00f2fe,
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

    // Each universe has roll offset (y offset and scale roll-in)
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
    let clock = new THREE.Clock();
    let previousMode = modeRef.current;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const delta = Math.min(clock.getDelta(), 0.05); // Clamp delta to avoid frame spikes
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse spring interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Project mouse into 3D world space
      mouse.worldPos.set(mouse.x * 320, mouse.y * 220, 0);

      // --- DEEP 3D MOUSE PARALLAX & PERSPECTIVE TILT ---
      camera.position.x = mouse.x * 110;
      camera.position.y = mouse.y * 85;
      scene.rotation.y = mouse.x * 0.16;
      scene.rotation.x = -mouse.y * 0.12;

      // --- FADE-AWAY & ROLL-IN THEME INTERPOLATION ---
      const activeMode = modeRef.current;

      // Detect theme switch trigger
      if (activeMode !== previousMode) {
        // Reset incoming roll state: starts scaled slightly and offset
        rollStates[activeMode].scale = 0.90;
        rollStates[activeMode].rollY = -35;
        previousMode = activeMode;
      }

      // Smooth roll-in progress towards target
      ['dark', 'synthwave', 'matrix', 'light'].forEach((key) => {
        const isActive = activeMode === key;
        const targetWeight = isActive ? 1.0 : 0.0;
        weights[key] += (targetWeight - weights[key]) * 0.085;

        // Roll in physics: scale up to 1.0 and roll position to 0
        rollStates[key].scale += (1.0 - rollStates[key].scale) * 0.08;
        rollStates[key].rollY += (0.0 - rollStates[key].rollY) * 0.08;
      });

      applyGroupWeightAndRoll(cosmicGroup, weights.dark, 'dark');
      applyGroupWeightAndRoll(synthwaveGroup, weights.synthwave, 'synthwave');
      applyGroupWeightAndRoll(matrixGroup, weights.matrix, 'matrix');
      applyGroupWeightAndRoll(frostGroup, weights.light, 'light');

      // --- ANIMATE UNIVERSE 1: COSMIC CYBER (Starfield + Cursor Constellations) ---
      if (cosmicGroup.visible) {
        const positions = cosmicGeometry.attributes.position.array;
        let lineIdx = 0;
        const linePos = lineGeometry.attributes.position.array;

        // 1. Particle motion & Cursor Magnetic Field
        for (let i = 0; i < cosmicCount; i++) {
          const idx = i * 3;
          positions[idx] += cosmicVelocities[i].vx;
          positions[idx + 1] += cosmicVelocities[i].vy;
          positions[idx + 2] += cosmicVelocities[i].vz;

          // Boundaries bounce
          if (Math.abs(positions[idx]) > 470) cosmicVelocities[i].vx *= -1;
          if (Math.abs(positions[idx + 1]) > 370) cosmicVelocities[i].vy *= -1;
          if (Math.abs(positions[idx + 2]) > 300) cosmicVelocities[i].vz *= -1;

          // Interactive 3D Cursor Gravitational Vortex
          const dx = positions[idx] - mouse.worldPos.x;
          const dy = positions[idx + 1] - mouse.worldPos.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 22000 && distSq > 40) {
            const force = (1 - distSq / 22000) * 1.5;
            positions[idx] += (dx / Math.sqrt(distSq)) * force;
            positions[idx + 1] += (dy / Math.sqrt(distSq)) * force;
          }

          // 2. Inter-Star Constellation Lines
          if (i < 80 && lineIdx < (maxLines - 12) * 6) {
            for (let j = i + 1; j < 80; j++) {
              const jdx = j * 3;
              const dX = positions[idx] - positions[jdx];
              const dY = positions[idx + 1] - positions[jdx + 1];
              const dZ = positions[idx + 2] - positions[jdx + 2];
              const d = Math.sqrt(dX * dX + dY * dY + dZ * dZ);

              if (d < 62 && lineIdx < (maxLines - 12) * 6) {
                linePos[lineIdx++] = positions[idx];
                linePos[lineIdx++] = positions[idx + 1];
                linePos[lineIdx++] = positions[idx + 2];
                linePos[lineIdx++] = positions[jdx];
                linePos[lineIdx++] = positions[jdx + 1];
                linePos[lineIdx++] = positions[jdx + 2];
              }
            }
          }

          // 3. CURSOR CONSTELLATION TETHER: Connect cursor directly to nearest stars!
          if (i < 8 && lineIdx < maxLines * 6) {
            linePos[lineIdx++] = mouse.worldPos.x;
            linePos[lineIdx++] = mouse.worldPos.y;
            linePos[lineIdx++] = 10;
            linePos[lineIdx++] = positions[idx];
            linePos[lineIdx++] = positions[idx + 1];
            linePos[lineIdx++] = positions[idx + 2];
          }
        }

        // Fill remaining lines with zeroes
        for (let k = lineIdx; k < maxLines * 6; k++) {
          linePos[k] = 0;
        }

        cosmicGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.position.needsUpdate = true;
        cosmicGroup.rotation.y = elapsedTime * 0.015;
      }

      // --- ANIMATE UNIVERSE 2: NEON SYNTHWAVE (3D Cyber Warp Tunnel & Steering) ---
      if (synthwaveGroup.visible) {
        // Steer tunnel dynamically through space with mouse coordinates
        tunnelRings.forEach((ringItem, idx) => {
          ringItem.mesh.position.z += 2.2;
          // Wrap around for infinite seamless tunnel
          if (ringItem.mesh.position.z > 350) {
            ringItem.mesh.position.z = -ringCount * tunnelSpacing + 350;
          }

          // Dynamic 3D Steering Curve: the further down the tunnel, the more it swoops with mouse!
          const depthFactor = (idx / ringCount);
          ringItem.mesh.position.x = mouse.x * (depthFactor * 120) + Math.sin(elapsedTime * 1.5 + idx * 0.3) * 6;
          ringItem.mesh.position.y = mouse.y * (depthFactor * 90) + Math.cos(elapsedTime * 1.5 + idx * 0.3) * 5;
          ringItem.mesh.rotation.z = elapsedTime * 0.2 + idx * 0.05;
        });

        // Animate high-speed laser rails
        const laserPos = laserGeometry.attributes.position.array;
        for (let i = 0; i < laserCount; i++) {
          const idx = i * 6;
          const vel = laserVelocities[i];
          laserPos[idx + 2] += vel.speed;
          laserPos[idx + 5] += vel.speed;

          // Wrap back to distant horizon
          if (laserPos[idx + 2] > 380) {
            const z = -1200 - Math.random() * 300;
            laserPos[idx + 2] = z;
            laserPos[idx + 5] = z + 65;
          }

          // Steer lasers with mouse
          laserPos[idx] = Math.cos(vel.baseAngle) * vel.baseR + mouse.x * 40;
          laserPos[idx + 1] = Math.sin(vel.baseAngle) * (vel.baseR * 0.7) + mouse.y * 30;
          laserPos[idx + 3] = laserPos[idx];
          laserPos[idx + 4] = laserPos[idx + 1];
        }
        laserGeometry.attributes.position.needsUpdate = true;

        // Synthwave Sun rotation & vanishing point tracking
        synthSun.position.x = mouse.x * 60;
        synthSun.position.y = mouse.y * 45;
        synthSun.rotation.z = elapsedTime * 0.3;
      }

      // --- ANIMATE UNIVERSE 3: MATRIX TERMINAL (Digital Rain & Wake Ripple) ---
      if (matrixGroup.visible) {
        const matrixPos = matrixGeometry.attributes.position.array;
        for (let i = 0; i < matrixCount; i++) {
          const idx = i * 3;
          matrixPos[idx + 1] -= matrixVelocities[i].fallSpeed;

          // Cursor wake: push particles aside horizontally as mouse passes
          const dx = matrixPos[idx] - mouse.worldPos.x;
          const dy = matrixPos[idx + 1] - mouse.worldPos.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 16000 && distSq > 30) {
            const push = (1 - distSq / 16000) * 2.2;
            matrixPos[idx] += (dx / Math.sqrt(distSq)) * push;
          }

          if (matrixPos[idx + 1] < -460) {
            matrixPos[idx + 1] = matrixVelocities[i].resetY;
            matrixPos[idx] = matrixVelocities[i].originalX;
          }
        }
        matrixGeometry.attributes.position.needsUpdate = true;

        // Telemetry rings orient and face the mouse
        matrixRings.forEach((ring) => {
          ring.rotation.z += ring.userData.baseSpin;
          ring.rotation.x = -mouse.y * 0.4;
          ring.rotation.y = mouse.x * 0.4;
        });
      }

      // --- ANIMATE UNIVERSE 4: NORDIC FROST (Glass Orbs & Swirling Crystalline Dust) ---
      if (frostGroup.visible) {
        frostSpheres.forEach((sphere) => {
          sphere.rotation.x += sphere.userData.rotSpeed;
          sphere.rotation.y += sphere.userData.rotSpeed * 1.2;

          // Gentle mouse repulsion
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

        // Prismatic dust swirl around cursor
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

      // --- ANIMATE CLICK RIPPLES ---
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
      cosmicGeometry.dispose();
      cosmicMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      tunnelRings.forEach((r) => {
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
      });
      laserGeometry.dispose();
      laserMaterial.dispose();
      sunGeom.dispose();
      sunMat.dispose();
      matrixGeometry.dispose();
      matrixMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
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
