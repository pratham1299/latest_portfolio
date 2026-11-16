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
  grad.addColorStop(0.4, baseColorHex);
  grad.addColorStop(0.78, "rgba(42, 22, 14, 0.94)");
  grad.addColorStop(1, "rgba(18, 9, 5, 0.98)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Delicate wing veins
  ctx.strokeStyle = "rgba(25, 12, 8, 0.75)";
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

  // Delicate white/pearl margin dots along wing border
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
  grad.addColorStop(0, "rgba(255, 250, 230, 1)");
  grad.addColorStop(0.25, "rgba(245, 210, 120, 0.9)");
  grad.addColorStop(0.6, "rgba(215, 140, 70, 0.4)");
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
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeed6, 2.2);
    sunLight.position.set(4, 5, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xcde8ff, 1.1);
    rimLight.position.set(-4, -2, 2);
    scene.add(rimLight);

    // Helper to compute chest/silhouette anchor in 3D world space from camera aspect
    const getChestAnchor = () => {
      const halfW = 6.0 * Math.tan((45 * Math.PI) / 360) * camera.aspect;
      // Portrait silhouette center at 74% horizontal width across screen
      return {
        x: -halfW + 0.74 * (2 * halfW),
        y: 0.32,
      };
    };

    let chestAnchor = getChestAnchor();

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

    const swarmMaterials = colorThemes.map(({ base, accent }) => {
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

    // ==========================================
    // BUTTERFLY SWARM BREAKING FROM PORTRAIT
    // Starts 100% invisible / clean at rest (scrollY = 0).
    // ONLY as the user scrolls, butterflies emerge from her silhouette and take flight!
    // ==========================================
    const SWARM_COUNT = 80;
    const butterflies = [];

    for (let i = 0; i < SWARM_COUNT; i++) {
      const mat = swarmMaterials[i % swarmMaterials.length];
      const group = new THREE.Group();

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

      const thorax = new THREE.Mesh(thoraxGeo, bodyMat);
      thorax.rotation.x = Math.PI / 2;
      group.add(thorax);

      const head = new THREE.Mesh(headGeo, bodyMat);
      head.position.set(0, 0.14, 0);
      group.add(head);

      // Start completely at scale 0 (invisible at rest)
      group.scale.set(0, 0, 0);
      scene.add(group);

      // Distribute offsets across her silhouette (hair, shoulders, blazer, torso)
      let ox, oy, oz;
      const r = Math.random();
      if (r < 0.28) {
        // Head & hair area
        ox = (Math.random() - 0.5) * 0.75;
        oy = 0.82 + (Math.random() - 0.5) * 0.55;
        oz = (Math.random() - 0.5) * 0.2;
      } else if (r < 0.65) {
        // Shoulders & upper blazer
        ox = (Math.random() - 0.5) * 1.25;
        oy = (Math.random() - 0.5) * 0.5;
        oz = (Math.random() - 0.5) * 0.25;
      } else {
        // Lower jacket & torso
        ox = (Math.random() - 0.5) * 1.4;
        oy = -0.68 + (Math.random() - 0.5) * 0.75;
        oz = (Math.random() - 0.5) * 0.3;
      }

      // Distance from chest epicenter sets the peel-away cascade timing
      const distFromChest = Math.hypot(ox, oy);
      const stagger = Math.max(0, Math.min(distFromChest * 0.18, 0.32));

      // Flight trajectory: outward spread + upward lift + camera depth
      const angle = Math.atan2(oy, ox) + (Math.random() - 0.5) * 0.6;
      const speed = 2.4 + Math.random() * 3.4;
      const lift = 1.2 + Math.random() * 2.8;

      const scatterDir = new THREE.Vector3(
        Math.cos(angle) * speed - 0.3,
        Math.sin(angle) * 0.5 + lift,
        1.2 + Math.random() * 2.8
      );

      const swirlSpeed = 1.8 + Math.random() * 2.5;
      const swirlRadius = 0.3 + Math.random() * 0.55;
      const swirlPhase = Math.random() * Math.PI * 2;
      const baseScale = 0.15 + Math.random() * 0.13;

      butterflies.push({
        group,
        leftPivot,
        rightPivot,
        leftHind,
        rightHind,
        offset: new THREE.Vector3(ox, oy, oz),
        homePos: new THREE.Vector3(),
        scatterDir,
        swirlSpeed,
        swirlRadius,
        swirlPhase,
        stagger,
        baseScale,
        flapSpeed: 16 + Math.random() * 12,
        flapPhase: Math.random() * Math.PI * 2,
        flapAmp: 0.75 + Math.random() * 0.25,
        currentPos: new THREE.Vector3(),
        rotX: 0,
        rotY: 0,
        rotZ: 0,
      });
    }

    // ==========================================
    // GOLDEN FAIRY DUST PARTICLES
    // Emitted ONLY during scroll flight
    // ==========================================
    const SPARKLE_COUNT = 140;
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

    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));

    const sparkleTexture = createSparkleTexture();
    const sparkleMat = new THREE.PointsMaterial({
      size: 0.18,
      map: sparkleTexture,
      transparent: true,
      opacity: 0.0, // starts completely hidden at rest
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffd57a,
    });

    const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparklePoints);

    // ==========================================
    // SCROLL TRACKING
    // ==========================================
    let scrollProgress = 0;
    let targetProgress = 0;

    const handleScroll = () => {
      const heroHeight = container.clientHeight || window.innerHeight;
      const sy = window.scrollY;
      targetProgress = Math.min(Math.max(sy / (heroHeight * 0.75), 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // ==========================================
    // ANIMATION LOOP
    // ==========================================
    let animationFrameId;
    const clock = new THREE.Clock();
    let sparkleCursor = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Sleep when hero is far off-screen to preserve 60-120fps scroll performance
      const heroThreshold = (container.clientHeight || window.innerHeight) * 1.4;
      if (window.scrollY > heroThreshold) {
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Exponential smooth damping
      const damp = 1.0 - Math.pow(0.001, delta);
      scrollProgress += (targetProgress - scrollProgress) * damp;

      chestAnchor = getChestAnchor();

      // At rest (scrollProgress near 0), KEEP EVERYTHING INVISIBLE (clean portrait)
      if (scrollProgress < 0.008) {
        swarmMaterials.forEach((m) => {
          m.opacity = 0;
        });
        bodyMat.opacity = 0;
        sparkleMat.opacity = 0;

        butterflies.forEach((b) => {
          b.group.scale.set(0, 0, 0);
        });

        renderer.render(scene, camera);
        return;
      }

      // --- ANIMATE SWARM BREAKING FROM PORTRAIT ON SCROLL ---
      const swarmOpacity = Math.min(scrollProgress / 0.12, 1.0);
      swarmMaterials.forEach((m) => {
        m.opacity = swarmOpacity * 0.95;
      });
      bodyMat.opacity = swarmOpacity * 0.95;
      sparkleMat.opacity = swarmOpacity * 0.85;

      butterflies.forEach((b, idx) => {
        // Sync home position to anchor
        b.homePos.set(
          chestAnchor.x + b.offset.x,
          chestAnchor.y + b.offset.y,
          b.offset.z
        );

        if (scrollProgress <= b.stagger) {
          // Still waiting for the peel wave to reach this part
          b.group.scale.set(0, 0, 0);
          b.group.position.copy(b.homePos);
        } else {
          // Butterfly blooms and flies out from the dissolving silhouette!
          const rawP = Math.min((scrollProgress - b.stagger) / (1.0 - b.stagger), 1.0);
          const easeP = 1 - Math.pow(1 - rawP, 2.6);

          // Bloom scale from 0 to full size as it lifts off
          const bloomScale = b.baseScale * Math.min(rawP * 3.5, 1.0) * (0.85 + easeP * 0.4);
          b.group.scale.set(bloomScale, bloomScale, bloomScale);

          // Harmonic swirling flight
          const swirlAngle = time * b.swirlSpeed + b.swirlPhase;
          const swirlX = Math.cos(swirlAngle) * b.swirlRadius * easeP;
          const swirlY = Math.sin(swirlAngle * 1.2) * b.swirlRadius * easeP;

          const targetX = b.homePos.x + b.scatterDir.x * easeP * 1.8 + swirlX;
          const targetY = b.homePos.y + b.scatterDir.y * easeP * 1.8 + swirlY;
          const targetZ = b.homePos.z + b.scatterDir.z * easeP * 1.6;

          b.currentPos.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
          b.group.position.copy(b.currentPos);

          // Wing flapping
          const flapRate = b.flapSpeed * (1 + easeP * 1.2);
          const flapCycle = Math.sin(time * flapRate + b.flapPhase);
          const wingAngle = (flapCycle * 0.65 + 0.25) * b.flapAmp;

          b.leftPivot.rotation.y = wingAngle;
          b.rightPivot.rotation.y = -wingAngle;
          b.leftHind.rotation.y = wingAngle * 0.85;
          b.rightHind.rotation.y = -wingAngle * 0.85;

          // Orientation
          const flightDx = targetX - b.homePos.x;
          const flightDy = targetY - b.homePos.y;
          const targetRotY = Math.atan2(flightDx, targetZ - b.homePos.z) * 0.55;
          const targetRotX = -flightDy * 0.16;
          const targetRotZ = -flightDx * 0.28 + Math.sin(time * 2.5 + idx) * 0.08;

          b.rotX += (targetRotX - b.rotX) * 0.09;
          b.rotY += (targetRotY - b.rotY) * 0.09;
          b.rotZ += (targetRotZ - b.rotZ) * 0.09;
          b.group.rotation.set(b.rotX, b.rotY, b.rotZ);

          // Spawn sparkles behind flying butterflies
          if (rawP > 0.04 && rawP < 0.95 && Math.random() < 0.18) {
            const sIdx = sparkleCursor;
            sparkleCursor = (sparkleCursor + 1) % SPARKLE_COUNT;
            const pos = sparkleGeo.attributes.position;
            pos.setXYZ(sIdx, b.currentPos.x, b.currentPos.y, b.currentPos.z);
            sparkleLifes[sIdx] = 1.0;
            sparkleVelocities[sIdx].set(
              (Math.random() - 0.5) * 0.02,
              -0.01 - Math.random() * 0.02,
              (Math.random() - 0.5) * 0.02
            );
          }
        }
      });

      // Update sparkle particles
      const posAttr = sparkleGeo.attributes.position;
      for (let i = 0; i < SPARKLE_COUNT; i++) {
        if (sparkleLifes[i] > 0) {
          sparkleLifes[i] -= delta * 1.5;
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
      chestAnchor = getChestAnchor();
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
      swarmMaterials.forEach((m) => {
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
