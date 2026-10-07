import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Typography, Chip, Tooltip, IconButton, Button } from '@mui/material';
import { RotateLeft, AutoAwesome, Flare, Memory, BugReport, Psychology, Smartphone, Terminal } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const PILLARS = [
  {
    id: 'ai',
    title: 'Local AI / RAG Engine',
    desc: 'Ollama • Llama 3.1:8B • Vector Embeddings',
    icon: <Psychology sx={{ fontSize: 16 }} />,
    color: '#00f2fe'
  },
  {
    id: 'security',
    title: 'Systems & NetSentinel',
    desc: 'Linux C/Daemons • Raw Packet Sockets',
    icon: <Memory sx={{ fontSize: 16 }} />,
    color: '#ff2a85'
  },
  {
    id: 'mobile',
    title: 'Mobile Architecture',
    desc: 'Flutter • Dart • Offline Cloud Sync',
    icon: <Smartphone sx={{ fontSize: 16 }} />,
    color: '#00ff88'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web SPAs',
    desc: 'React.js • Node.js • REST APIs',
    icon: <Flare sx={{ fontSize: 16 }} />,
    color: '#fbbf24'
  }
];

const HolographicCore = ({ onBackToTerminal }) => {
  const mountRef = useRef(null);
  const { currentTheme, isDark } = useThemeMode();
  const [activePillar, setActivePillar] = useState(PILLARS[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 480;
    const height = mount.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 30, 160);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group holding entire 3D holographic structure
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Core: Inner Glowing Octahedron
    const innerGeom = new THREE.OctahedronGeometry(18, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(currentTheme.primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    // 2. Central Core: Outer Wireframe Icosahedron
    const outerGeom = new THREE.IcosahedronGeometry(28, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(currentTheme.secondaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerCore = new THREE.Mesh(outerGeom, outerMat);
    coreGroup.add(outerCore);

    // 3. Inner Quantum Pulsing Sphere
    const sphereGeom = new THREE.SphereGeometry(10, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(currentTheme.primaryColor),
      transparent: true,
      opacity: 0.4
    });
    const pulseSphere = new THREE.Mesh(sphereGeom, sphereMat);
    coreGroup.add(pulseSphere);

    // 4. Concentric Orbital Rings with Satellites
    const orbitRings = [];
    const satellites = [];
    const ringRadii = [45, 62, 78, 95];

    ringRadii.forEach((radius, idx) => {
      // Ring
      const ringGeom = new THREE.RingGeometry(radius - 0.4, radius + 0.4, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(PILLARS[idx].color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2 + (idx - 1.5) * 0.28;
      ring.rotation.y = (idx - 1.5) * 0.2;
      coreGroup.add(ring);
      orbitRings.push(ring);

      // Satellite node
      const satGeom = new THREE.SphereGeometry(4, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(PILLARS[idx].color)
      });
      const sat = new THREE.Mesh(satGeom, satMat);
      coreGroup.add(sat);

      satellites.push({
        mesh: sat,
        radius,
        ring,
        angle: (idx * Math.PI) / 2,
        speed: 0.015 + idx * 0.005,
        pillar: PILLARS[idx]
      });
    });

    // 5. Surrounding Cosmic Holographic Spark Dust
    const sparkCount = 120;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 35 + Math.random() * 85;
      sparkPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sparkPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sparkPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const sparkGeom = new THREE.BufferGeometry();
    sparkGeom.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 2.5,
      color: new THREE.Color(currentTheme.primaryColor),
      transparent: true,
      opacity: 0.65
    });
    const sparks = new THREE.Points(sparkGeom, sparkMat);
    coreGroup.add(sparks);

    // Mouse Drag Rotation Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      coreGroup.rotation.y += deltaX * 0.008;
      coreGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Continuous subtle auto-rotation
      if (!isDragging) {
        coreGroup.rotation.y += 0.006;
        coreGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.12;
      }

      // Rotate inner & outer geometry opposite ways
      innerCore.rotation.y = elapsed * 0.8;
      innerCore.rotation.x = elapsed * 0.5;
      outerCore.rotation.y = -elapsed * 0.4;
      outerCore.rotation.z = elapsed * 0.3;

      // Pulse inner sphere scale
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.15;
      pulseSphere.scale.set(scale, scale, scale);

      // Animate orbiting satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const ringRotX = sat.ring.rotation.x;
        const ringRotY = sat.ring.rotation.y;

        const localX = Math.cos(sat.angle) * sat.radius;
        const localZ = Math.sin(sat.angle) * sat.radius;

        // Approximate position relative to ring orientation
        sat.mesh.position.x = localX * Math.cos(ringRotY) - localZ * Math.sin(ringRotY);
        sat.mesh.position.y = -localZ * Math.sin(ringRotX);
        sat.mesh.position.z = localZ * Math.cos(ringRotX);
      });

      // Update theme colors dynamically
      innerMat.color.lerp(new THREE.Color(currentTheme.primaryColor), 0.08);
      outerMat.color.lerp(new THREE.Color(currentTheme.secondaryColor), 0.08);
      pulseSphere.material.color.lerp(new THREE.Color(currentTheme.primaryColor), 0.08);
      sparkMat.color.lerp(new THREE.Color(currentTheme.primaryColor), 0.08);

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();
      if (mount && dom) {
        mount.removeChild(dom);
      }
      renderer.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      outerGeom.dispose();
      outerMat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      sparkGeom.dispose();
      sparkMat.dispose();
    };
  }, [currentTheme]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: { xs: '380px', sm: '460px', md: '500px' }, display: 'flex', flexDirection: 'column' }}>
      {/* Interactive 3D Canvas Mount */}
      <Box
        ref={mountRef}
        sx={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
          cursor: isInteracting ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
      />

      {/* Floating HUD Overlay on top of 3D Canvas */}
      <Box
        sx={{
          position: 'absolute',
          top: 14,
          left: 14,
          right: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        <Box sx={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          {onBackToTerminal && (
            <Button
              size="small"
              onClick={onBackToTerminal}
              startIcon={<Terminal sx={{ fontSize: 13 }} />}
              sx={{
                bgcolor: isDark ? 'rgba(9, 14, 28, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                color: 'var(--primary-glow)',
                border: '1px solid var(--primary-glow)',
                boxShadow: '0 0 12px var(--theme-halo)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: { xs: '0.70rem', sm: '0.76rem' },
                fontWeight: 700,
                textTransform: 'none',
                px: 1.4,
                py: 0.45,
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'var(--theme-halo)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              ← Back to Terminal
            </Button>
          )}

          <Chip
            icon={<AutoAwesome sx={{ fontSize: 14, color: `${currentTheme.primaryColor} !important` }} />}
            label="3D Core"
            size="small"
            sx={{
              bgcolor: 'var(--subtle-chip-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              backdropFilter: 'blur(10px)'
            }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--text-muted)',
            fontSize: '0.70rem',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Drag to orbit • 360° interactive
        </Typography>
      </Box>

      {/* Bottom Pillars Telemetry HUD */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: 'var(--subtle-chip-bg)',
          borderTop: '1px solid var(--card-border)',
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          alignItems: 'center'
        }}
      >
        {PILLARS.map((p) => {
          const isSelected = activePillar.id === p.id;
          return (
            <Box
              key={p.id}
              onClick={() => setActivePillar(p)}
              sx={{
                flex: '1 0 auto',
                px: 1.4,
                py: 0.8,
                borderRadius: '8px',
                cursor: 'pointer',
                bgcolor: isSelected ? `${p.color}15` : 'transparent',
                border: '1px solid',
                borderColor: isSelected ? p.color : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${p.color}10`,
                  borderColor: `${p.color}60`
                }
              }}
            >
              <Box sx={{ color: p.color, display: 'flex', alignItems: 'center' }}>
                {p.icon}
              </Box>
              <Box>
                <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {p.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.66rem', fontFamily: 'JetBrains Mono, monospace', display: 'block' }}>
                  {p.desc}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HolographicCore;
