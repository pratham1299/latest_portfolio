import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Generates an elegant butterfly wing canvas texture.
 */
function createWingTexture(baseColorHex, accentColorHex) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 512, 512);

  // Radiant gradient from wing root outward
  const grad = ctx.createRadialGradient(140, 460, 20, 260, 260, 320);
  grad.addColorStop(0, accentColorHex);
  grad.addColorStop(0.5, baseColorHex);
  grad.addColorStop(0.85, "rgba(42, 22, 14, 0.92)");
  grad.addColorStop(1, "rgba(20, 10, 6, 0.98)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Delicate wing veins
  ctx.strokeStyle = "rgba(25, 12, 8, 0.7)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  const rootX = 60;
  const rootY = 460;
  const veinTargets = [
    [160, 80],
    [260, 60],
    [360, 90],
    [450, 150],
    [470, 240],
    [450, 340],
    [390, 420],
  ];

  veinTargets.forEach(([tx, ty], i) => {
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    const midX = (rootX + tx) * 0.45 + (i % 2 === 0 ? 30 : -25);
    const midY = (rootY + ty) * 0.55;
    ctx.quadraticCurveTo(midX, midY, tx, ty);
    ctx.stroke();
  });

  // Delicate white margin dots along wing border
  ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
  const marginDots = [
    [200, 65],
    [260, 55],
    [320, 65],
    [380, 95],
    [430, 140],
    [465, 200],
    [475, 270],
    [455, 340],
    [415, 400],
  ];

  marginDots.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates soft particle sprite for fairy dust.
 */
function createSparkleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 248, 220, 1)");
  grad.addColorStop(0.25, "rgba(240, 200, 110, 0.85)");
  grad.addColorStop(0.6, "rgba(210, 130, 65, 0.35)");
  grad.addColorStop(1, "rgba(180, 90, 40, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export default function HeroButterflyDisperse() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff0d8, 1.9);
    sunLight.position.set(3, 5, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xcde8ff, 0.9);
    rimLight.position.set(-4, -2, 2);
    scene.add(rimLight);

    // --- WING SHAPES ---
    // Upper forewing
    const forewingShape = new THREE.Shape();
    forewingShape.moveTo(0, 0);
    forewingShape.bezierCurveTo(0.15, 0.3, 0.5, 0.95, 1.0, 1.25);
    forewingShape.bezierCurveTo(1.3, 1.35, 1.45, 1.05, 1.3, 0.7);
    forewingShape.bezierCurveTo(1.1, 0.35, 0.65, 0.1, 0, 0);

    // Lower hindwing
    const hindwingShape = new THREE.Shape();
    hindwingShape.moveTo(0, 0);
    hindwingShape.bezierCurveTo(0.15, -0.15, 0.6, -0.3, 0.8, -0.65);
    hindwingShape.bezierCurveTo(0.85, -0.95, 0.55, -1.05, 0.3, -0.8);
    hindwingShape.bezierCurveTo(0.1, -0.5, 0.04, -0.2, 0, 0);

    const forewingGeo = new THREE.ShapeGeometry(forewingShape, 14);
    const hindwingGeo = new THREE.ShapeGeometry(hindwingShape, 14);

    // --- WING COLOR PALETTES SAMPLED FROM PORTRAIT ---
    const colorThemes = [
      { base: "#8c4424", accent: "#f5d09b" }, // Terracotta & honey
      { base: "#593322", accent: "#e2b882" }, // Rich brown blazer
      { base: "#2d1b14", accent: "#c49258" }, // Deep espresso hair
      { base: "#b87333", accent: "#fbf2d5" }, // Amber glow
      { base: "#6e4228", accent: "#ffd9aa" }, // Warm hazel
    ];

    const materials = colorThemes.map(({ base, accent }) => {
      const tex = createWingTexture(base, accent);
      return new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        roughness: 0.35,
        metalness: 0.2,
        depthWrite: false,
      });
    });

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.4,
      metalness: 0.7,
      transparent: true,
      opacity: 0,
    });

    const thoraxGeo = new THREE.CylinderGeometry(0.025, 0.02, 0.25, 8);
    const headGeo = new THREE.SphereGeometry(0.035, 8, 8);

    // --- BUTTERFLY FLOCK CREATION ---
    const BUTTERFLY_COUNT = 80;
    const butterflies = [];

    // Center anchor of the portrait
    const centerX = 1.45;
    const centerY = 0.0;

    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
      const mat = materials[i % materials.length];

      const group = new THREE.Group();

      // Left wing pivot
      const leftPivot = new THREE.Group();
      leftPivot.position.set(-0.025, 0, 0);

      const leftFore = new THREE.Mesh(forewingGeo, mat);
      leftFore.scale.set(-1, 1, 1);
      leftFore.rotation.z = 0.12;
      leftPivot.add(leftFore);

      const leftHind = new THREE.Mesh(hindwingGeo, mat);
      leftHind.scale.set(-0.85, 0.85, 1);
      leftHind.rotation.z = -0.1;
      leftPivot.add(leftHind);

      group.add(leftPivot);

      // Right wing pivot
      const rightPivot = new THREE.Group();
      rightPivot.position.set(0.025, 0, 0);

      const rightFore = new THREE.Mesh(forewingGeo, mat);
      rightFore.rotation.z = -0.12;
      rightPivot.add(rightFore);

      const rightHind = new THREE.Mesh(hindwingGeo, mat);
      rightHind.scale.set(0.85, 0.85, 1);
      rightHind.rotation.z = 0.1;
      rightPivot.add(rightHind);

      group.add(rightPivot);

      // Body
      const thorax = new THREE.Mesh(thoraxGeo, bodyMat);
      thorax.rotation.x = Math.PI / 2;
      group.add(thorax);

      const head = new THREE.Mesh(headGeo, bodyMat);
      head.position.set(0, 0.14, 0);
      group.add(head);

      // Delicate scale variation
      const baseScale = 0.16 + Math.random() * 0.12;
      group.scale.set(baseScale, baseScale, baseScale);

      scene.add(group);

      // Distribute home position across portrait silhouette
      let homeX, homeY, homeZ;
      const r = Math.random();
      if (r < 0.28) {
        // Head & hair
        homeX = 1.35 + (Math.random() - 0.5) * 0.8;
        homeY = 0.78 + (Math.random() - 0.5) * 0.65;
        homeZ = (Math.random() - 0.5) * 0.25;
      } else if (r < 0.65) {
        // Shoulders & upper blazer
        homeX = 1.45 + (Math.random() - 0.5) * 1.35;
        homeY = 0.15 + (Math.random() - 0.5) * 0.55;
        homeZ = (Math.random() - 0.5) * 0.35;
      } else {
        // Torso & lower jacket
        homeX = 1.4 + (Math.random() - 0.5) * 1.5;
        homeY = -0.68 + (Math.random() - 0.5) * 0.9;
        homeZ = (Math.random() - 0.5) * 0.4;
      }

      // Organic peeling wave: distance from center determines stagger timing
      const distFromCenter = Math.hypot(homeX - centerX, homeY - centerY);
      // Outer butterflies lift off first, core follows smoothly
      const stagger = Math.max(0, Math.min(0.28 - distFromCenter * 0.15, 0.25));

      // Flight trajectory: outward spread + upward lift + camera depth
      const angle = Math.atan2(homeY - centerY, homeX - centerX) + (Math.random() - 0.5) * 0.7;
      const speed = 2.0 + Math.random() * 3.2;
      const lift = 1.4 + Math.random() * 2.6;

      const scatterDir = new THREE.Vector3(
        Math.cos(angle) * speed + (Math.random() - 0.5) * 1.2,
        Math.sin(angle) * 0.55 + lift,
        0.8 + Math.random() * 2.2
      );

      // Smooth vortex turbulence
      const swirlSpeed = 1.8 + Math.random() * 2.4;
      const swirlRadius = 0.3 + Math.random() * 0.5;
      const swirlPhase = Math.random() * Math.PI * 2;

      butterflies.push({
        group,
        leftPivot,
        rightPivot,
        leftHind,
        rightHind,
        homePos: new THREE.Vector3(homeX, homeY, homeZ),
        scatterDir,
        swirlSpeed,
        swirlRadius,
        swirlPhase,
        stagger,
        baseScale,
        flapSpeed: 16 + Math.random() * 10,
        flapPhase: Math.random() * Math.PI * 2,
        flapAmp: 0.75 + Math.random() * 0.25,
        currentPos: new THREE.Vector3(homeX, homeY, homeZ),
        rotX: 0,
        rotY: 0,
        rotZ: 0,
      });

      group.position.set(homeX, homeY, homeZ);
    }

    // --- GOLDEN FAIRY DUST PARTICLES ---
    const SPARKLE_COUNT = 100;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(SPARKLE_COUNT * 3);
    const sparkleLifes = new Float32Array(SPARKLE_COUNT);
    const sparkleVelocities = [];

    for (let i = 0; i < SPARKLE_COUNT; i++) {
      sparklePositions[i * 3] = 9999;
      sparklePositions[i * 3 + 1] = 9999;
      sparklePositions[i * 3 + 2] = 9999;
      sparkleLifes[i] = 0;
      sparkleVelocities.push(new THREE.Vector3());
    }

    sparkleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(sparklePositions, 3)
    );

    const sparkleTexture = createSparkleTexture();
    const sparkleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: sparkleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffd57a,
    });

    const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparklePoints);

    // --- BUTTERY SMOOTH SCROLL TRACKING ---
    let scrollProgress = 0;
    let targetProgress = 0;

    const handleScroll = () => {
      const heroHeight = container.clientHeight || window.innerHeight;
      const sy = window.scrollY;
      // Normalizes scroll across the hero transition zone with gentle buffer
      targetProgress = Math.min(Math.max(sy / (heroHeight * 0.75), 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let clock = new THREE.Clock();
    let sparkleCursor = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Exponential smooth damping (butter-smooth across all refresh rates)
      const damp = 1.0 - Math.pow(0.001, delta);
      scrollProgress += (targetProgress - scrollProgress) * damp;

      // Master opacity: butterflies seamlessly appear as scroll starts
      const masterOpacity = Math.min(scrollProgress / 0.12, 1.0);

      materials.forEach((m) => {
        m.opacity = masterOpacity * 0.94;
      });
      bodyMat.opacity = masterOpacity * 0.94;

      // Update swarm of butterflies
      butterflies.forEach((b, idx) => {
        // Individual staggered progress
        const rawP = Math.max(0, (scrollProgress - b.stagger) / (1.0 - b.stagger));
        const p = Math.min(rawP, 1.0);

        // Smooth cubic ease-out trajectory
        const easeP = 1 - Math.pow(1 - p, 2.8);

        // Soft harmonic swirling
        const swirlAngle = time * b.swirlSpeed + b.swirlPhase;
        const swirlX = Math.cos(swirlAngle) * b.swirlRadius * easeP;
        const swirlY = Math.sin(swirlAngle * 1.2) * b.swirlRadius * easeP;

        // Position interpolation
        const targetX = b.homePos.x + b.scatterDir.x * easeP * 1.85 + swirlX;
        const targetY = b.homePos.y + b.scatterDir.y * easeP * 1.85 + swirlY;
        const targetZ = b.homePos.z + b.scatterDir.z * easeP * 1.6;

        // Smooth position lerp
        b.currentPos.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.09);
        b.group.position.copy(b.currentPos);

        // Natural wing flapping physics
        // Dynamic rate increases with acceleration
        const flapRate = b.flapSpeed * (1 + easeP * 1.1);
        const flapCycle = Math.sin(time * flapRate + b.flapPhase);
        // Realistic wing dihedral angle: downstroke is faster and wider
        const wingAngle = (flapCycle * 0.65 + 0.25) * b.flapAmp;

        b.leftPivot.rotation.y = wingAngle;
        b.rightPivot.rotation.y = -wingAngle;

        // Supple hindwing lag
        b.leftHind.rotation.y = wingAngle * 0.85;
        b.rightHind.rotation.y = -wingAngle * 0.85;

        // Smooth rotational orientation (no abrupt snapping)
        const flightDx = targetX - b.homePos.x;
        const flightDy = targetY - b.homePos.y;
        const targetRotY = Math.atan2(flightDx, targetZ - b.homePos.z) * 0.55;
        const targetRotX = -flightDy * 0.18;
        const targetRotZ = -flightDx * 0.3 + Math.sin(time * 2.5 + idx) * 0.08;

        b.rotX += (targetRotX - b.rotX) * 0.08;
        b.rotY += (targetRotY - b.rotY) * 0.08;
        b.rotZ += (targetRotZ - b.rotZ) * 0.08;

        b.group.rotation.set(b.rotX, b.rotY, b.rotZ);

        // Smooth scale modulation
        const currentScale = b.baseScale * (0.85 + easeP * 0.3);
        b.group.scale.set(currentScale, currentScale, currentScale);

        // Emit delicate fairy dust sparkles
        if (p > 0.06 && p < 0.96 && Math.random() < 0.15) {
          const sIdx = sparkleCursor;
          sparkleCursor = (sparkleCursor + 1) % SPARKLE_COUNT;
          const pos = sparkleGeo.attributes.position;
          pos.setXYZ(sIdx, b.currentPos.x, b.currentPos.y, b.currentPos.z);
          sparkleLifes[sIdx] = 1.0;
          sparkleVelocities[sIdx].set(
            (Math.random() - 0.5) * 0.015,
            -0.01 - Math.random() * 0.015,
            (Math.random() - 0.5) * 0.015
          );
        }
      });

      // Update sparkle particles
      const posAttr = sparkleGeo.attributes.position;
      for (let i = 0; i < SPARKLE_COUNT; i++) {
        if (sparkleLifes[i] > 0) {
          sparkleLifes[i] -= delta * 1.6;
          posAttr.setXYZ(
            i,
            posAttr.getX(i) + sparkleVelocities[i].x,
            posAttr.getY(i) + sparkleVelocities[i].y,
            posAttr.getZ(i) + sparkleVelocities[i].z
          );
        } else {
          posAttr.setXYZ(i, 9999, 9999, 9999);
        }
      }
      posAttr.needsUpdate = true;
      sparkleMat.opacity = masterOpacity * 0.85;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      forewingGeo.dispose();
      hindwingGeo.dispose();
      thoraxGeo.dispose();
      headGeo.dispose();
      bodyMat.dispose();
      sparkleGeo.dispose();
      sparkleMat.dispose();
      sparkleTexture.dispose();
      materials.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-hidden"
      aria-hidden="true"
    />
  );
}
