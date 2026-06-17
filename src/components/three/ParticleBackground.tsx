import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  intensity?: number;
}

export default function ParticleBackground({ intensity = 1 }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Scene Setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // ── Star Field ──
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 2000;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1800;
      starSizes[i] = Math.random() * 2.5 + 0.5;

      // Color variation: green, cyan, white
      const colorType = Math.random();
      if (colorType < 0.4) {
        starColors[i * 3] = 0;
        starColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        starColors[i * 3 + 2] = 0.4 + Math.random() * 0.3;
      } else if (colorType < 0.65) {
        starColors[i * 3] = 0;
        starColors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        starColors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else {
        starColors[i * 3] = 0.7 + Math.random() * 0.3;
        starColors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        starColors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      }
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75 * intensity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Grid Lines (XZ plane) ──
    const gridHelper = new THREE.GridHelper(2000, 40, 0x003322, 0x001a11);
    gridHelper.position.y = -250;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // ── Floating Nodes / Connection Graph ──
    const nodeCount = 60;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 800;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 400 - 100;
      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.1,
      });
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 3,
      transparent: true,
      opacity: 0.6 * intensity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // ── Connection Lines ──
    const maxDist = 160;
    const linePositions: number[] = [];

    const buildLines = () => {
      linePositions.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodePositions[i * 3] - nodePositions[j * 3];
          const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
          const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < maxDist) {
            linePositions.push(
              nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
              nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
            );
          }
        }
      }
    };

    buildLines();

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.08 * intensity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // ── Ambient Glow Sphere ──
    const glowGeo = new THREE.SphereGeometry(80, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.015,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    glowSphere.position.set(0, 0, -200);
    scene.add(glowSphere);

    // ── Mouse Interaction ──
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Resize Handler ──
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation Loop ──
    let lineUpdateTimer = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clockRef.current.getElapsedTime();
      const delta = clockRef.current.getDelta();

      // Rotate star field slowly
      stars.rotation.y = elapsed * 0.008;
      stars.rotation.x = elapsed * 0.003;

      // Move nodes
      for (let i = 0; i < nodeCount; i++) {
        nodePositions[i * 3] += nodeVelocities[i].x;
        nodePositions[i * 3 + 1] += nodeVelocities[i].y;
        nodePositions[i * 3 + 2] += nodeVelocities[i].z;

        // Wrap around bounds
        if (Math.abs(nodePositions[i * 3]) > 400) nodeVelocities[i].x *= -1;
        if (Math.abs(nodePositions[i * 3 + 1]) > 250) nodeVelocities[i].y *= -1;
        if (Math.abs(nodePositions[i * 3 + 2]) > 200) nodeVelocities[i].z *= -1;
      }
      (nodes.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Rebuild lines periodically
      lineUpdateTimer += delta;
      if (lineUpdateTimer > 0.1) {
        buildLines();
        const newPositions = new Float32Array(linePositions);
        lineGeo.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
        lineGeo.attributes.position.needsUpdate = true;
        lineUpdateTimer = 0;
      }

      // Camera parallax from mouse
      camera.position.x += (mouseRef.current.x * 30 - camera.position.x) * 0.03;
      camera.position.y += (mouseRef.current.y * 20 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Pulse glow sphere
      glowSphere.scale.setScalar(1 + Math.sin(elapsed * 0.8) * 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
