import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Creates the cute airplane with contrail in the sky
 */
function createSkyAirplane({ scale = 0.65, direction = 1, accentColor = 0xf3705a } = {}) {
  const planeGroup = new THREE.Group();

  const planeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.2,
  });

  const accentMat = new THREE.MeshStandardMaterial({ color: accentColor });

  // Fuselage
  const bodyGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.5, 12);
  bodyGeo.rotateZ(Math.PI / 2);
  const body = new THREE.Mesh(bodyGeo, planeMat);
  planeGroup.add(body);

  // Nose
  const noseGeo = new THREE.ConeGeometry(0.04, 0.12, 12);
  noseGeo.rotateZ(-Math.PI / 2);
  const nose = new THREE.Mesh(noseGeo, accentMat);
  nose.position.x = 0.31;
  planeGroup.add(nose);

  // Wings
  const wingGeo = new THREE.BoxGeometry(0.18, 0.012, 0.72);
  const wing = new THREE.Mesh(wingGeo, planeMat);
  wing.position.x = 0.05;
  planeGroup.add(wing);

  // Tail fin
  const finGeo = new THREE.BoxGeometry(0.1, 0.12, 0.015);
  const fin = new THREE.Mesh(finGeo, accentMat);
  fin.position.set(-0.2, 0.06, 0);
  planeGroup.add(fin);

  // Horizontal tail
  const tailHGeo = new THREE.BoxGeometry(0.08, 0.01, 0.28);
  const tailH = new THREE.Mesh(tailHGeo, planeMat);
  tailH.position.set(-0.2, 0.01, 0);
  planeGroup.add(tailH);

  // Contrail line
  const contrailMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.75,
  });
  const contrailPoints = [new THREE.Vector3(-0.25, 0, 0), new THREE.Vector3(-14.0, 0, 0)];
  const contrailGeo = new THREE.BufferGeometry().setFromPoints(contrailPoints);
  const contrailLine = new THREE.Line(contrailGeo, contrailMat);
  planeGroup.add(contrailLine);

  if (direction < 0) {
    planeGroup.rotation.y = Math.PI;
    planeGroup.rotation.z = 0.03;
  } else {
    planeGroup.rotation.z = -0.04;
  }

  planeGroup.scale.set(scale, scale, scale);

  return planeGroup;
}

/**
 * Procedurally generates a glowing 4-pointed celestial diamond sparkle star (✦)
 */
function createStarSparkleTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;

  // 1. Soft radial background aura
  const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 46);
  radGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  radGrad.addColorStop(0.2, "rgba(255, 245, 225, 0.6)");
  radGrad.addColorStop(0.5, "rgba(180, 215, 255, 0.15)");
  radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. Primary 4-pointed diamond star rays (✦) with sharp needle-pinched curves
  ctx.save();
  ctx.beginPath();
  const r = 50;
  const pinch = 5.5;
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx + pinch, cy - pinch, cx + r, cy);
  ctx.quadraticCurveTo(cx + pinch, cy + pinch, cx, cy + r);
  ctx.quadraticCurveTo(cx - pinch, cy + pinch, cx - r, cy);
  ctx.quadraticCurveTo(cx - pinch, cy - pinch, cx, cy - r);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();

  // 3. Diagonal secondary glint rays (rotated 45deg)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 4);
  ctx.beginPath();
  const diagR = 22;
  const diagPinch = 3;
  ctx.moveTo(0, -diagR);
  ctx.quadraticCurveTo(diagPinch, -diagPinch, diagR, 0);
  ctx.quadraticCurveTo(diagPinch, diagPinch, 0, diagR);
  ctx.quadraticCurveTo(-diagPinch, diagPinch, -diagR, 0);
  ctx.quadraticCurveTo(-diagPinch, -diagPinch, 0, -diagR);
  ctx.closePath();
  ctx.fillStyle = "rgba(255, 248, 220, 0.8)";
  ctx.fill();
  ctx.restore();

  // 4. Ultra-bright hot center core
  ctx.beginPath();
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function GlobalSkyScene({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0.0, 0.0, 6.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 2.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeed6, 2.2);
    sunLight.position.set(6, 8, 5);
    scene.add(sunLight);

    // --- 3 AIRPLANES (Top, Center, Bottom) ---
    const airplanes = [
      {
        mesh: createSkyAirplane({ scale: 0.65, direction: 1, accentColor: 0xf3705a }),
        speed: 1.5,
        direction: 1,
        minX: -10.0,
        maxX: 10.0,
        baseY: 3.1,
        yVariance: 0.35,
        z: -4.0,
        initialX: -3.5,
      },
      {
        mesh: createSkyAirplane({ scale: 0.52, direction: -1, accentColor: 0x28b5e8 }),
        speed: 1.25,
        direction: -1,
        minX: -10.0,
        maxX: 10.0,
        baseY: 0.5,
        yVariance: 0.3,
        z: -5.0,
        initialX: 5.0,
      },
      {
        mesh: createSkyAirplane({ scale: 0.58, direction: 1, accentColor: 0xf7a934 }),
        speed: 1.75,
        direction: 1,
        minX: -10.0,
        maxX: 10.0,
        baseY: -2.3,
        yVariance: 0.35,
        z: -4.4,
        initialX: -8.0,
      },
    ];

    airplanes.forEach((plane) => {
      plane.mesh.position.set(plane.initialX, plane.baseY, plane.z);
      scene.add(plane.mesh);
    });

    // --- 3D CLOUDS (Soft & ethereal so they never hide text or content) ---
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
    });
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    const makeCloud = (cx, cy, cz, scale) => {
      const cg = new THREE.Group();
      [-0.4, 0, 0.4].forEach((ox, i) => {
        const puff = new THREE.Mesh(
          new THREE.SphereGeometry(i === 1 ? 0.42 : 0.3, 12, 12),
          cloudMat
        );
        puff.position.set(ox, 0, 0);
        cg.add(puff);
      });
      cg.position.set(cx, cy, cz);
      cg.scale.set(scale, scale * 0.7, scale);
      cloudGroup.add(cg);
    };

    // Position clouds shifted toward the right side, keeping "LET'S TALK" and left headings crystal clear
    makeCloud(-1.6, 3.1, -2.6, 1.4);
    makeCloud(3.2, 1.6, -3.0, 1.65);
    makeCloud(-1.3, -0.8, -2.2, 1.35);
    makeCloud(0.5, -3.0, -2.4, 1.5);

    // --- 3D CELESTIAL DIAMOND SPARKLE STARS (✦) ---
    const starTexture = createStarSparkleTexture();
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const starItems = [];
    const STAR_COUNT = 110;

    for (let i = 0; i < STAR_COUNT; i++) {
      // Delicate star sizes: majority are subtle twinkling sparkles, ~12% are elegant hero glints
      const isHero = Math.random() < 0.12;
      const baseSize = isHero ? 0.16 + Math.random() * 0.08 : 0.065 + Math.random() * 0.065;

      // Color tints: pure diamond white, warm golden sparkle, or icy celestial tint
      const colorRoll = Math.random();
      const starColor = colorRoll > 0.4 ? 0xffffff : (colorRoll > 0.2 ? 0xfffae0 : 0xe4f4ff);

      const mat = new THREE.SpriteMaterial({
        map: starTexture,
        color: starColor,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(mat);
      sprite.position.set(
        (Math.random() - 0.5) * 19,
        (Math.random() - 0.5) * 15,
        -3.6 + (Math.random() - 0.5) * 3
      );
      sprite.scale.set(baseSize, baseSize, 1);
      starGroup.add(sprite);

      starItems.push({
        sprite,
        mat,
        baseSize,
        twinkleSpeed: 1.8 + Math.random() * 3.2,
        twinklePhase: Math.random() * Math.PI * 2,
        baseRot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.25,
      });
    }

    // --- ANIMATION LOOP ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();
      
      // Calculate scroll progress directly from window without re-rendering React tree
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;

      // Airplanes cruise across the sky
      airplanes.forEach((plane) => {
        if (plane.direction > 0) {
          plane.mesh.position.x += delta * plane.speed;
          if (plane.mesh.position.x > plane.maxX) {
            plane.mesh.position.x = plane.minX;
            plane.mesh.position.y = plane.baseY + (Math.random() - 0.5) * plane.yVariance;
          }
        } else {
          plane.mesh.position.x -= delta * plane.speed;
          if (plane.mesh.position.x < plane.minX) {
            plane.mesh.position.x = plane.maxX;
            plane.mesh.position.y = plane.baseY + (Math.random() - 0.5) * plane.yVariance;
          }
        }
      });

      // Clouds gently drift on the open right sky and soften as night falls to keep text 100% visible
      cloudGroup.position.x = 0.3 + Math.sin(time * 0.1) * 0.35;
      if (currentScroll > 0.45) {
        cloudMat.opacity = Math.max(0.06, 0.18 - (currentScroll - 0.45) * 0.22);
      } else {
        cloudMat.opacity = 0.18;
      }

      // Stars fade in and independently twinkle with rotating diamond rays as night falls
      if (currentScroll > 0.58) {
        starGroup.visible = true;
        const masterOpacity = Math.min((currentScroll - 0.58) * 2.8, 0.95);
        starItems.forEach((star) => {
          const shimmer = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
          star.mat.opacity = masterOpacity * (0.6 + shimmer * 0.4);
          const currentScale = star.baseSize * (0.85 + shimmer * 0.22);
          star.sprite.scale.set(currentScale, currentScale, 1);
          star.mat.rotation = star.baseRot + time * star.rotSpeed;
        });
      } else {
        starGroup.visible = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      starTexture.dispose();
      starItems.forEach((star) => {
        star.mat.dispose();
      });
      cloudMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full select-none pointer-events-none"
      aria-hidden="true"
    />
  );
}

