import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Creates canvas texture for the 3 Traffic Light lenses (Heart, Smiley, Down Arrow)
 */
function createTrafficLightLensesTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // Dark visor panel
  ctx.fillStyle = "#161514";
  ctx.fillRect(0, 0, 768, 256);

  // Helper to draw LED matrix grid circle
  const drawLens = (cx, cy, color, drawSymbol) => {
    // Outer lens rim
    ctx.strokeStyle = "#383431";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#0c0a09";
    ctx.beginPath();
    ctx.arc(cx, cy, 90, 0, Math.PI * 2);
    ctx.fill();

    // LED dots grid
    ctx.fillStyle = color;
    drawSymbol(ctx, cx, cy);
  };

  // Lens 1: Red Heart ❤️
  drawLens(128, 128, "#ff3355", (c, cx, cy) => {
    c.font = "bold 96px system-ui, sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("♥", cx, cy + 4);
  });

  // Lens 2: Yellow Smiley 😊
  drawLens(384, 128, "#ffd84d", (c, cx, cy) => {
    c.lineWidth = 9;
    c.strokeStyle = "#ffd84d";
    c.lineCap = "round";
    // Eyes
    c.fillRect(cx - 32, cy - 24, 14, 14);
    c.fillRect(cx + 18, cy - 24, 14, 14);
    // Smile
    c.beginPath();
    c.arc(cx, cy, 46, 0.2, Math.PI - 0.2);
    c.stroke();
  });

  // Lens 3: Green Down Arrows ⏬
  drawLens(640, 128, "#2ecc71", (c, cx, cy) => {
    c.font = "bold 88px system-ui, sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("⏬", cx, cy + 4);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.outputColorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates canvas texture for street signs
 */
function createStreetSignTexture(text, subtext = "", isArrow = false, bgColor = "#1f63f2") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // Determine if background is light (e.g. yellow) to ensure high contrast
  const isLightBg = bgColor === "#e4d875" || bgColor === "#f5efc0" || bgColor === "#ffffff" || bgColor === "#ffd84d";
  const textColor = isLightBg ? "#1b1a1a" : "#ffffff";
  const borderColor = isLightBg ? "#1b1a1a" : "#ffffff";
  const subtextColor = isLightBg ? "#4a4542" : "#f5efc0";

  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.roundRect(14, 14, 484, 228, 26);
  ctx.fill();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (isArrow) {
    ctx.font = "900 56px system-ui, sans-serif";
    ctx.fillText(`${text} ⬇`, 256, subtext ? 104 : 128);

    if (subtext) {
      ctx.font = "bold 26px system-ui, sans-serif";
      ctx.fillStyle = subtextColor;
      ctx.fillText(subtext, 256, 168);
    }
  } else {
    ctx.font = "bold 52px system-ui, sans-serif";
    ctx.fillText(text, 256, subtext ? 104 : 128);

    if (subtext) {
      ctx.font = "bold 26px system-ui, sans-serif";
      ctx.fillStyle = subtextColor;
      ctx.fillText(subtext, 256, 168);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.outputColorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates texture for Bunting Flags "THE END" (Image 2)
 */
function createBuntingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 160;
  const ctx = canvas.getContext("2d");

  const letters = ["T", "H", "E", "E", "N", "D"];
  const colors = ["#ff4fa6", "#ffd84d", "#62e3ff", "#b7eed0", "#ff7a45", "#9b59b6"];

  const flagW = 90;
  letters.forEach((l, i) => {
    const x = 30 + i * 90;
    // Triangular flag
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(x, 10);
    ctx.lineTo(x + flagW - 10, 10);
    ctx.lineTo(x + (flagW - 10) / 2, 145);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Letter
    ctx.fillStyle = "#1b1540";
    ctx.font = "bold 54px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(l, x + (flagW - 10) / 2, 60);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.outputColorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates faceted mosaic texture for the Disco Ball
 */
function createDiscoBallTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#c5ccd6";
  ctx.fillRect(0, 0, 512, 256);

  const tileColors = ["#ffffff", "#e8edf5", "#fdf2f8", "#ecfeff", "#fef9c3", "#e0e7ff"];
  const rows = 16;
  const cols = 32;
  const tileW = 512 / cols;
  const tileH = 256 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = tileColors[(r * 7 + c * 13) % tileColors.length];
      ctx.fillRect(c * tileW + 1, r * tileH + 1, tileW - 2, tileH - 2);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.outputColorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates texture for the yellow BF-07 hazard amplifier box
 */
function createHornBoxTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#e59b2b";
  ctx.fillRect(0, 0, 512, 384);

  // Outer border & bolts
  ctx.strokeStyle = "#25201d";
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, 488, 360);

  // Hazard warning label
  ctx.fillStyle = "#25201d";
  ctx.font = "bold 34px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("⚠ BF - 07", 256, 75);

  // Cooling vent grill
  ctx.fillStyle = "#382921";
  for (let y = 125; y <= 215; y += 18) {
    ctx.fillRect(120, y, 272, 8);
  }

  // Safety notices
  ctx.fillStyle = "#25201d";
  ctx.font = "bold 20px monospace";
  ctx.fillText("BIRD FM • POST NO BILLS", 256, 275);
  ctx.font = "bold 16px monospace";
  ctx.fillText("2x90W • 100V OUTPUT", 256, 310);

  const tex = new THREE.CanvasTexture(canvas);
  tex.outputColorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Procedural sticker texture for the pillar
 */
function createPillarStickersTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#4a4542";
  ctx.fillRect(0, 0, 1024, 2048);

  const drawSticker = (x, y, w, h, bg, drawContent, rot = 0) => {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(rot);

    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 5, -h / 2 + 5, w, h, 14);
    ctx.fill();

    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 14);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    drawContent(ctx, w, h);
    ctx.restore();
  };

  // Smiley
  drawSticker(110, 180, 140, 140, "#f5efc0", (c) => {
    c.fillStyle = "#1b1a1a";
    c.beginPath();
    c.arc(-26, -14, 10, 0, Math.PI * 2);
    c.arc(26, -14, 10, 0, Math.PI * 2);
    c.fill();
    c.lineWidth = 8;
    c.lineCap = "round";
    c.beginPath();
    c.arc(0, 8, 38, 0.2, Math.PI - 0.2);
    c.stroke();
  }, -0.12);

  // Mint Ghost
  drawSticker(680, 320, 150, 170, "#ebfff4", (c) => {
    c.fillStyle = "#1b1a1a";
    c.beginPath();
    c.arc(-25, -20, 12, 0, Math.PI * 2);
    c.arc(25, -20, 12, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.arc(0, 25, 14, 0, Math.PI * 2);
    c.fill();
  }, 0.18);

  // Pink Star
  drawSticker(220, 640, 120, 150, "#fbe4ec", (c) => {
    c.fillStyle = "#1b1a1a";
    c.font = "bold 90px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("★", 0, 0);
  }, 0.1);

  // Blue Heart
  drawSticker(710, 920, 140, 140, "#e0f6ff", (c) => {
    c.fillStyle = "#1b1a1a";
    c.font = "bold 90px system-ui";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("♥", 0, 0);
  }, -0.2);

  // Barcode
  drawSticker(620, 1480, 190, 100, "#ffffff", (c, w) => {
    c.fillStyle = "#1b1a1a";
    for (let x = -w / 2 + 18; x < w / 2 - 18; x += 12) {
      c.fillRect(x, -26, (x % 24 === 0 ? 7 : 3), 52);
    }
  }, -0.05);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.outputColorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates stylized bird with long-distance hover flight
 */
function createInteractiveBird({ hat = "none", scale = 0.9 }) {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xfcfbf9,
    roughness: 0.75,
  });

  const beakMat = new THREE.MeshStandardMaterial({
    color: 0xf7a934,
    roughness: 0.35,
  });

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1b1a1a });
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0xf0ece5,
    roughness: 0.75,
  });

  // Body
  const bodyGeo = new THREE.SphereGeometry(0.24, 16, 16);
  bodyGeo.scale(0.9, 1.05, 1.25);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 0.24, 0);
  group.add(body);

  // Head
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.42, 0.18);

  const headGeo = new THREE.SphereGeometry(0.17, 16, 16);
  const head = new THREE.Mesh(headGeo, bodyMat);
  headGroup.add(head);

  // Beak
  const beakGeo = new THREE.ConeGeometry(0.065, 0.18, 8);
  beakGeo.rotateX(Math.PI / 2);
  const beak = new THREE.Mesh(beakGeo, beakMat);
  beak.position.set(0, -0.02, 0.22);
  headGroup.add(beak);

  // Eyes
  [-1, 1].forEach((dir) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), eyeMat);
    eye.position.set(dir * 0.11, 0.04, 0.13);
    headGroup.add(eye);
  });

  // Hats
  if (hat === "bucket") {
    const hatMat = new THREE.MeshStandardMaterial({ color: 0xe4d875, roughness: 0.5 });
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.12, 12), hatMat);
    crown.position.set(0, 0.17, -0.02);
    crown.rotation.x = -0.12;
    headGroup.add(crown);

    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.02, 14), hatMat);
    brim.position.set(0, 0.11, -0.02);
    brim.rotation.x = -0.12;
    headGroup.add(brim);
  } else if (hat === "beanie") {
    const beanieMat = new THREE.MeshStandardMaterial({ color: 0xb7eed0, roughness: 0.8 });
    const beanie = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), beanieMat);
    beanie.position.set(0, 0.14, 0);
    headGroup.add(beanie);

    const pompom = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf3b8ce }));
    pompom.position.set(0, 0.32, 0);
    headGroup.add(pompom);
  } else if (hat === "party") {
    const partyMat = new THREE.MeshStandardMaterial({ color: 0xff4fa6, roughness: 0.4 });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.26, 10), partyMat);
    cone.position.set(0, 0.26, 0);
    headGroup.add(cone);
  } else if (hat === "sunglasses") {
    const frameMat = new THREE.MeshBasicMaterial({ color: 0x1b1a1a });
    [-1, 1].forEach((dir) => {
      const lens = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.02), frameMat);
      lens.position.set(dir * 0.09, 0.04, 0.17);
      headGroup.add(lens);
    });
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.02), frameMat);
    bridge.position.set(0, 0.05, 0.17);
    headGroup.add(bridge);
  }

  group.add(headGroup);

  // Wings
  const leftWingPivot = new THREE.Group();
  leftWingPivot.position.set(-0.21, 0.3, 0.02);

  const rightWingPivot = new THREE.Group();
  rightWingPivot.position.set(0.21, 0.3, 0.02);

  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.quadraticCurveTo(0.15, 0.25, 0.22, 0.55);
  wingShape.quadraticCurveTo(0.1, 0.65, 0.0, 0.6);
  wingShape.quadraticCurveTo(-0.16, 0.35, 0, 0);

  const wingGeo = new THREE.ShapeGeometry(wingShape, 10);

  const leftWing = new THREE.Mesh(wingGeo, wingMat);
  leftWing.rotation.set(Math.PI / 2.2, -0.2, Math.PI / 1.15);
  leftWing.scale.set(0.65, 0.9, 0.65);
  leftWingPivot.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, wingMat);
  rightWing.rotation.set(Math.PI / 2.2, 0.2, -Math.PI / 1.15);
  rightWing.scale.set(0.65, 0.9, 0.65);
  rightWingPivot.add(rightWing);

  group.add(leftWingPivot);
  group.add(rightWingPivot);

  // Tail
  const tailGeo = new THREE.ConeGeometry(0.09, 0.26, 6);
  tailGeo.rotateX(-Math.PI / 2.6);
  const tail = new THREE.Mesh(tailGeo, new THREE.MeshStandardMaterial({ color: 0x4a4744 }));
  tail.position.set(0, 0.26, -0.32);
  group.add(tail);

  // Legs & Claws
  const legMat = new THREE.MeshStandardMaterial({ color: 0xf7a934 });
  [-1, 1].forEach((dir) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.16, 6), legMat);
    leg.position.set(dir * 0.09, 0.08, 0);
    group.add(leg);
    const claw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.08), legMat);
    claw.position.set(dir * 0.09, 0.005, 0.02);
    group.add(claw);
  });

  // Hitbox for hover raycasting
  const hitBox = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 8, 8),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitBox.position.set(0, 0.3, 0);
  group.add(hitBox);

  group.scale.set(scale, scale, scale);

  return {
    group,
    headGroup,
    leftWingPivot,
    rightWingPivot,
    hitBox,
    isFlying: false,
    flightProgress: 0,
    perchPos: new THREE.Vector3(),
    perchRotY: 0,
    flightSeed: Math.random() * 2 - 1,
    triggerFlight() {
      if (this.isFlying) return;
      this.isFlying = true;
      this.flightProgress = 0;
    },
  };
}

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

  // 2. Primary 4-pointed diamond star rays (✦)
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

export default function MesqPillarScene({ scrollProgress = 0 }) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 2.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeed6, 2.4);
    sunLight.position.set(6, 8, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xb7eed0, 1.2);
    rimLight.position.set(-5, -2, 2);
    scene.add(rimLight);

    // --- AIRPLANES IN THE SKY (Top, Center, Bottom) ---
    const airplanes = [
      // 1. Top Plane (High Altitude)
      {
        mesh: createSkyAirplane({ scale: 0.65, direction: 1, accentColor: 0xf3705a }),
        speed: 1.5,
        direction: 1,
        minX: -9.5,
        maxX: 9.5,
        baseY: 3.1,
        yVariance: 0.35,
        z: -4.0,
        initialX: -4.0,
      },
      // 2. Center Plane (Mid Altitude)
      {
        mesh: createSkyAirplane({ scale: 0.52, direction: -1, accentColor: 0x28b5e8 }),
        speed: 1.25,
        direction: -1,
        minX: -9.5,
        maxX: 9.5,
        baseY: 0.5,
        yVariance: 0.3,
        z: -5.0,
        initialX: 5.5,
      },
      // 3. Bottom Plane (Lower Altitude)
      {
        mesh: createSkyAirplane({ scale: 0.58, direction: 1, accentColor: 0xf7a934 }),
        speed: 1.75,
        direction: 1,
        minX: -9.5,
        maxX: 9.5,
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

    // --- FULL-HEIGHT PILLAR ON THE RIGHT ---
    const pillarGroup = new THREE.Group();
    const aspect = container.clientWidth / container.clientHeight;
    const initialPillarX = aspect < 1.3 ? Math.max(1.5, aspect * 1.55) : 2.22;
    pillarGroup.position.set(initialPillarX, -7.0, 0);
    scene.add(pillarGroup);

    // Main pillar column (starts at Y = 7.7 down to Y = -12.3)
    const mastGeo = new THREE.CylinderGeometry(0.25, 0.28, 20.0, 28);
    const mastMat = new THREE.MeshStandardMaterial({
      map: createPillarStickersTexture(),
      roughness: 0.5,
      metalness: 0.15,
    });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = -2.3;
    pillarGroup.add(mast);

    // --- PILLAR STARTING POINT / TOP FINIAL (Image homage) ---
    // 1. Yellow/gold collar band right below the cap
    const topCollarMat = new THREE.MeshStandardMaterial({ color: 0xf7a934, roughness: 0.35 });
    const topCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.14, 24),
      topCollarMat
    );
    topCollar.position.y = 7.75;
    pillarGroup.add(topCollar);

    // 2. Tapered dark charcoal lamp cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0x221f28, roughness: 0.45 });
    const poleCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.27, 0.60, 24),
      capMat
    );
    poleCap.position.y = 8.12;
    pillarGroup.add(poleCap);

    // 3. Flat crown disc at the very top of the cap
    const crownDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.19, 0.05, 24),
      new THREE.MeshStandardMaterial({ color: 0x16141a, roughness: 0.5 })
    );
    crownDisc.position.y = 8.44;
    pillarGroup.add(crownDisc);

    // Collar rings along the lower mast
    const clampMat = new THREE.MeshStandardMaterial({ color: 0x1f63f2, roughness: 0.4 });
    const mintClampMat = new THREE.MeshStandardMaterial({ color: 0xb7eed0, roughness: 0.4 });
    const yellowClampMat = new THREE.MeshStandardMaterial({ color: 0xf5efc0, roughness: 0.4 });
    const pinkClampMat = new THREE.MeshStandardMaterial({ color: 0xf3b8ce, roughness: 0.4 });

    [-9.5, -7.0, -4.5, -2.0, 0.5, 3.0, 5.5].forEach((yPos, i) => {
      const clampGeo = new THREE.TorusGeometry(0.3, 0.038, 12, 24);
      const mats = [clampMat, mintClampMat, yellowClampMat, pinkClampMat];
      const clamp = new THREE.Mesh(clampGeo, mats[i % mats.length]);
      clamp.rotation.x = Math.PI / 2;
      clamp.position.y = yPos;
      pillarGroup.add(clamp);
    });

    const birds = [];

    // ==========================================
    // STAGE 0: TRAFFIC LIGHT MAST (Image 3 homage)
    // Starting point with black cap, yellow T-joint, 6 birds on bar!
    // ==========================================
    // Yellow sleeve around the mast at the crossbar junction
    const yellowJoint = new THREE.Mesh(
      new THREE.CylinderGeometry(0.30, 0.30, 0.52, 24),
      topCollarMat
    );
    yellowJoint.position.y = 7.0;
    pillarGroup.add(yellowJoint);

    // Horizontal yellow socket extending left
    const socketSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.40, 16),
      topCollarMat
    );
    socketSleeve.rotation.z = Math.PI / 2;
    socketSleeve.position.set(-0.35, 7.0, 0);
    pillarGroup.add(socketSleeve);

    // Lime green ring collar below the yellow joint
    const limeRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.30, 0.045, 12, 24),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.4 })
    );
    limeRing.rotation.x = Math.PI / 2;
    limeRing.position.y = 6.45;
    pillarGroup.add(limeRing);

    // Purple 230V electrical junction box
    const junctionBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.36, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x6b46c1, roughness: 0.45 })
    );
    junctionBox.position.set(-0.16, 5.6, 0.18);
    pillarGroup.add(junctionBox);

    const voltLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.16, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xf5efc0 })
    );
    voltLabel.position.set(-0.16, 5.6, 0.30);
    pillarGroup.add(voltLabel);

    // Horizontal arm extending left
    const trafficArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 3.2, 14),
      yellowClampMat
    );
    trafficArm.rotation.z = Math.PI / 2;
    trafficArm.position.set(-1.4, 7.0, 0);
    pillarGroup.add(trafficArm);

    // Cable line curving down to purple junction box
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.4, 6.0, 0.1),
      new THREE.Vector3(-0.75, 5.8, 0.18),
      new THREE.Vector3(-0.16, 5.6, 0.2),
    ]);
    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(cableCurve, 16, 0.015, 6, false),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    pillarGroup.add(cable);

    // Yellow Traffic Light Box
    const trafficBox = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.95, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xf7a934, roughness: 0.4 })
    );
    trafficBox.position.set(-1.4, 6.4, 0.12);
    trafficBox.rotation.y = 0;
    pillarGroup.add(trafficBox);

    // 3 Lenses display panel
    const lensesPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 0.8),
      new THREE.MeshStandardMaterial({
        map: createTrafficLightLensesTexture(),
        roughness: 0.2,
      })
    );
    lensesPanel.position.set(-1.4, 6.4, 0.29);
    lensesPanel.rotation.y = 0;
    pillarGroup.add(lensesPanel);

    // 6 Birds perched in a cute row along the traffic bar (matching Image)
    const birdConfigs0 = [
      { hat: "none", x: -2.6, rotY: -0.12 },
      { hat: "sunglasses", x: -2.15, rotY: -0.05 },
      { hat: "beanie", x: -1.7, rotY: 0.02 },
      { hat: "none", x: -1.25, rotY: 0.08 },
      { hat: "sunglasses", x: -0.8, rotY: -0.04 },
      { hat: "bucket", x: -0.4, rotY: 0.12 },
    ];
    birdConfigs0.forEach((cfg) => {
      const b = createInteractiveBird({ hat: cfg.hat, scale: 0.78 });
      b.perchPos.set(cfg.x, 7.04, 0.05);
      b.group.position.copy(b.perchPos);
      b.perchRotY = cfg.rotY;
      b.group.rotation.y = b.perchRotY;
      pillarGroup.add(b.group);
      birds.push(b);
    });

    // ==========================================
    // STAGE 1: TRACK OPINION SIGN (Y = 4.2)
    // 2 birds on this board facing forward toward card!
    // ==========================================
    const sign1Arm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.4, 12), clampMat);
    sign1Arm.rotation.z = Math.PI / 2;
    sign1Arm.position.set(-1.0, 4.2, 0);
    pillarGroup.add(sign1Arm);

    const sign1Tex = createStreetSignTexture("TRACK OPINION", "MARKET ASSOCIATE", false, "#1f63f2");
    const sign1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.75, 0.06),
      new THREE.MeshStandardMaterial({ map: sign1Tex, roughness: 0.3 })
    );
    sign1.position.set(-1.1, 4.2, 0.1);
    sign1.rotation.y = 0;
    pillarGroup.add(sign1);

    // 2 Birds on Sign 1
    const b1_1 = createInteractiveBird({ hat: "sunglasses", scale: 0.84 });
    b1_1.perchPos.set(-1.4, 4.62, 0.1);
    b1_1.group.position.copy(b1_1.perchPos);
    b1_1.perchRotY = -0.1;
    b1_1.group.rotation.y = b1_1.perchRotY;
    pillarGroup.add(b1_1.group);
    birds.push(b1_1);

    const b1_2 = createInteractiveBird({ hat: "bucket", scale: 0.82 });
    b1_2.perchPos.set(-0.8, 4.62, 0.1);
    b1_2.group.position.copy(b1_2.perchPos);
    b1_2.perchRotY = 0.08;
    b1_2.group.rotation.y = b1_2.perchRotY;
    pillarGroup.add(b1_2.group);
    birds.push(b1_2);

    // ==========================================
    // STAGE 2: GTM PLAYBOOK ARROW (Y = 1.4)
    // 2 birds on this board, facing forward toward card!
    // ==========================================
    const sign2Arm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.2, 12), yellowClampMat);
    sign2Arm.rotation.z = Math.PI / 2;
    sign2Arm.position.set(-0.9, 1.4, 0);
    pillarGroup.add(sign2Arm);

    const sign2Tex = createStreetSignTexture("GTM PLAYBOOK", "MEDHAVI SKILL UNIV.", true, "#e4d875");
    const sign2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.7, 0.06),
      new THREE.MeshStandardMaterial({ map: sign2Tex, roughness: 0.3 })
    );
    sign2.position.set(-1.0, 1.4, 0.1);
    sign2.rotation.y = 0;
    pillarGroup.add(sign2);

    const b2_1 = createInteractiveBird({ hat: "beanie", scale: 0.84 });
    b2_1.perchPos.set(-1.3, 1.8, 0.1);
    b2_1.group.position.copy(b2_1.perchPos);
    b2_1.perchRotY = -0.08;
    b2_1.group.rotation.y = b2_1.perchRotY;
    pillarGroup.add(b2_1.group);
    birds.push(b2_1);

    const b2_2 = createInteractiveBird({ hat: "sunglasses", scale: 0.8 });
    b2_2.perchPos.set(-0.7, 1.8, 0.1);
    b2_2.group.position.copy(b2_2.perchPos);
    b2_2.perchRotY = 0.12;
    b2_2.group.rotation.y = b2_2.perchRotY;
    pillarGroup.add(b2_2.group);
    birds.push(b2_2);

    // ==========================================
    // STAGE 3: OUTBOUND & CRO MATRIX (Y = -1.4)
    // 2 birds on this board!
    // ==========================================
    const ledBoxArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.0, 12), pinkClampMat);
    ledBoxArm.rotation.z = Math.PI / 2;
    ledBoxArm.position.set(-0.85, -1.4, 0);
    pillarGroup.add(ledBoxArm);

    const ledBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.88, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xd47a54, roughness: 0.4 })
    );
    ledBox.position.set(-1.0, -1.4, 0.15);
    ledBox.rotation.y = 0;
    pillarGroup.add(ledBox);

    const ledFront = new THREE.Mesh(
      new THREE.PlaneGeometry(1.45, 0.75),
      new THREE.MeshStandardMaterial({
        map: createStreetSignTexture("OUTBOUND & CRO", "SEVENTH TRIANGLE", false, "#1b1a1a"),
      })
    );
    ledFront.position.set(-1.0, -1.4, 0.25);
    ledFront.rotation.y = 0;
    pillarGroup.add(ledFront);

    const b3_1 = createInteractiveBird({ hat: "sunglasses", scale: 0.84 });
    b3_1.perchPos.set(-1.3, -0.9, 0.22);
    b3_1.group.position.copy(b3_1.perchPos);
    b3_1.perchRotY = -0.1;
    b3_1.group.rotation.y = b3_1.perchRotY;
    pillarGroup.add(b3_1.group);
    birds.push(b3_1);

    const b3_2 = createInteractiveBird({ hat: "party", scale: 0.8 });
    b3_2.perchPos.set(-0.7, -0.9, 0.22);
    b3_2.group.position.copy(b3_2.perchPos);
    b3_2.perchRotY = 0.14;
    b3_2.group.rotation.y = b3_2.perchRotY;
    pillarGroup.add(b3_2.group);
    birds.push(b3_2);

    // ==========================================
    // STAGE 4: PAID MEDIA CROSSING (Y = -4.2)
    // ==========================================
    const cross1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.26, 0.04),
      new THREE.MeshStandardMaterial({
        map: createStreetSignTexture("PAID ADS", "", false, "#f3705a"),
      })
    );
    cross1.position.set(-0.95, -4.2, 0.1);
    cross1.rotation.set(0, 0, 0.55);
    pillarGroup.add(cross1);

    const cross2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.26, 0.04),
      new THREE.MeshStandardMaterial({
        map: createStreetSignTexture("ROAS 25%+", "", false, "#ffffff"),
      })
    );
    cross2.position.set(-0.95, -4.2, 0.1);
    cross2.rotation.set(0, 0, -0.55);
    pillarGroup.add(cross2);

    // const b4_1 = createInteractiveBird({ hat: "beanie", scale: 0.85 });
    // b4_1.perchPos.set(-1.0, -3.7, 0.15);
    // b4_1.group.position.copy(b4_1.perchPos);
    // b4_1.perchRotY = 0.02;
    // b4_1.group.rotation.y = b4_1.perchRotY;
    // pillarGroup.add(b4_1.group);
    // birds.push(b4_1);

    // ==========================================
    // STAGE 5: FINALE "THE END" DISCO PERCH (Image 2 homage, Y = -7.0)
    // Bunting flags, hanging disco ball, loudspeakers, and 3 birds on top!
    // Centered at X = -1.1 on arm -> stays fully inside viewport!
    // ==========================================
    const endBarArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 2.6, 12),
      mintClampMat
    );
    endBarArm.rotation.z = Math.PI / 2;
    endBarArm.position.set(-1.1, -7.0, 0);
    pillarGroup.add(endBarArm);

    // Bunting flags "THE END"
    const buntingPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 0.55),
      new THREE.MeshStandardMaterial({
        map: createBuntingTexture(),
        transparent: true,
        roughness: 0.4,
      })
    );
    buntingPlane.position.set(-1.1, -7.3, 0.1);
    buntingPlane.rotation.y = 0;
    pillarGroup.add(buntingPlane);

    // Hanging Faceted Mosaic Disco Ball
    const discoBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 16, 16),
      new THREE.MeshStandardMaterial({
        map: createDiscoBallTexture(),
        metalness: 0.85,
        roughness: 0.2,
      })
    );
    discoBall.position.set(-1.1, -7.85, 0.15);
    pillarGroup.add(discoBall);

    // Wire holding disco ball
    const discoWire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.35, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    discoWire.position.set(-1.1, -7.45, 0.15);
    pillarGroup.add(discoWire);

    // Loudspeaker horns box below disco ball with BF-07 hazard label
    const hornBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 0.65, 0.2),
      new THREE.MeshStandardMaterial({
        map: createHornBoxTexture(),
        roughness: 0.45,
      })
    );
    hornBox.position.set(-1.1, -8.7, 0.1);
    hornBox.rotation.y = 0;
    pillarGroup.add(hornBox);

    // Two megaphone horn bells
    [-1, 1].forEach((dir) => {
      const hornGeo = new THREE.ConeGeometry(0.24, 0.45, 12);
      hornGeo.rotateZ(dir * Math.PI / 2);
      const horn = new THREE.Mesh(
        hornGeo,
        new THREE.MeshStandardMaterial({ color: 0xff4fa6, roughness: 0.4 })
      );
      horn.position.set(-1.1 + dir * 0.65, -8.7, 0.15);
      pillarGroup.add(horn);
    });

    // 3 Birds perched on top of THE END bar (Image 2) facing forward towards user!
    const b5_1 = createInteractiveBird({ hat: "beanie", scale: 0.82 });
    b5_1.perchPos.set(-1.6, -6.95, 0.1);
    b5_1.group.position.copy(b5_1.perchPos);
    b5_1.perchRotY = -0.12;
    b5_1.group.rotation.y = b5_1.perchRotY;
    pillarGroup.add(b5_1.group);
    birds.push(b5_1);

    const b5_2 = createInteractiveBird({ hat: "sunglasses", scale: 0.82 });
    b5_2.perchPos.set(-1.1, -6.95, 0.1);
    b5_2.group.position.copy(b5_2.perchPos);
    b5_2.perchRotY = 0.0;
    b5_2.group.rotation.y = b5_2.perchRotY;
    pillarGroup.add(b5_2.group);
    birds.push(b5_2);

    const b5_3 = createInteractiveBird({ hat: "party", scale: 0.82 });
    b5_3.perchPos.set(-0.6, -6.95, 0.1);
    b5_3.group.position.copy(b5_3.perchPos);
    b5_3.perchRotY = 0.12;
    b5_3.group.rotation.y = b5_3.perchRotY;
    pillarGroup.add(b5_3.group);
    birds.push(b5_3);

    // --- 3D CELESTIAL DIAMOND SPARKLE STARS (✦) ---
    const starTexture = createStarSparkleTexture();
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const starItems = [];
    const STAR_COUNT = 100;

    for (let i = 0; i < STAR_COUNT; i++) {
      const isHero = Math.random() < 0.12;
      const baseSize = isHero ? 0.16 + Math.random() * 0.08 : 0.065 + Math.random() * 0.065;
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
        (Math.random() - 0.5) * 18,
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
        const puff = new THREE.Mesh(new THREE.SphereGeometry(i === 1 ? 0.42 : 0.3, 12, 12), cloudMat);
        puff.position.set(ox, 0, 0);
        cg.add(puff);
      });
      cg.position.set(cx, cy, cz);
      cg.scale.set(scale, scale * 0.7, scale);
      cloudGroup.add(cg);
    };

    makeCloud(-2.8, 2.8, -2.5, 1.5);
    makeCloud(2.4, 1.2, -3.0, 1.7);
    makeCloud(-2.0, -1.2, -2.0, 1.3);
    makeCloud(1.8, -3.8, -2.2, 1.6);

    // --- RAYCASTER FOR WIDE BIRD FLIGHT ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hitboxes = birds.map((b) => b.hitBox);
      const intersects = raycaster.intersectObjects(hitboxes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const targetBird = birds.find((b) => b.hitBox === hit);
        if (targetBird) {
          targetBird.triggerFlight();
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    const clock = new THREE.Clock();

    let smoothedScroll = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Smooth scroll interpolation
      const targetScroll = scrollRef.current;
      smoothedScroll += (targetScroll - smoothedScroll) * 0.07;

      // CONTINUOUS SCROLL-DRIVEN TRANSLATION & VISIBLE 3D ROTATION
      // Total travel distance = 14 units (from Y = -7.0 up to +7.0)
      const travelDistance = 14.0;
      pillarGroup.position.y = -7.0 + smoothedScroll * travelDistance;

      // CONTINUOUS VISIBLE ROTATION ON SCROLL!
      // Speed and arc are carefully calibrated so every hoarding ALWAYS faces frontside toward the left card:
      // - Base angle -0.18 rad (~ -10.3 deg) keeps the banner faces angled directly toward the card and viewer
      // - Dynamic sinusoidal arc (±4.5 deg) visibly rotates the mast cylinder, stickers and clamps as you scroll
      // - Velocity-responsive twist gives lively, tangible 3D feedback when scrolling
      // - Subtle idle sway keeps the scene organic and alive
      const scrollDiff = targetScroll - smoothedScroll;
      const dynamicArc = Math.sin(smoothedScroll * Math.PI * 4) * 0.08;
      const velocityTilt = scrollDiff * 0.45;
      const idleSway = Math.sin(time * 0.5) * 0.015;

      pillarGroup.rotation.y = -0.18 + dynamicArc + velocityTilt + idleSway;

      // Spin disco ball
      discoBall.rotation.y = time * 1.5;

      // Stars fade in and independently twinkle with rotating diamond rays as night falls (when scroll > 0.44)
      if (smoothedScroll > 0.44) {
        const masterOpacity = Math.min((smoothedScroll - 0.44) * 2.8, 0.95);
        starItems.forEach((star) => {
          const shimmer = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
          star.mat.opacity = masterOpacity * (0.6 + shimmer * 0.4);
          const currentScale = star.baseSize * (0.85 + shimmer * 0.22);
          star.sprite.scale.set(currentScale, currentScale, 1);
          star.mat.rotation = star.baseRot + time * star.rotSpeed;
        });
      } else {
        starItems.forEach((star) => {
          star.mat.opacity = 0.0;
        });
      }

      // Airplanes cruise smoothly across the sky (top, center, and bottom)
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

      // Background clouds gently drift and soften as night falls to keep content clear
      cloudGroup.position.x = Math.sin(time * 0.12) * 0.5;
      if (smoothedScroll > 0.45) {
        cloudMat.opacity = Math.max(0.06, 0.18 - (smoothedScroll - 0.45) * 0.22);
      } else {
        cloudMat.opacity = 0.18;
      }

      // Animate birds with wide, majestic flight trajectories!
      birds.forEach((b, idx) => {
        if (b.isFlying) {
          // Takes off into wide distance!
          b.flightProgress += delta * 0.45; // ~2.2s flight
          const p = b.flightProgress;

          if (p >= 1.0) {
            b.isFlying = false;
            b.flightProgress = 0;
            b.group.position.copy(b.perchPos);
            b.group.rotation.set(0, b.perchRotY, 0);
            b.leftWingPivot.rotation.z = 0;
            b.rightWingPivot.rotation.z = 0;
          } else {
            const loopAngle = p * Math.PI * 2;
            // Flies wide across the screen and high into the sky!
            const flightArcX = Math.sin(loopAngle) * (2.8 + b.flightSeed * 0.8);
            const flightArcY = Math.sin(p * Math.PI) * (2.4 + Math.abs(b.flightSeed) * 0.6);
            const flightArcZ = (1 - Math.cos(loopAngle)) * 1.8;

            b.group.position.set(
              b.perchPos.x + flightArcX,
              b.perchPos.y + flightArcY,
              b.perchPos.z + flightArcZ
            );

            const flap = Math.sin(time * 26) * 0.8;
            b.leftWingPivot.rotation.z = flap;
            b.rightWingPivot.rotation.z = -flap;

            b.group.rotation.y = b.perchRotY + Math.cos(loopAngle) * 1.2;
            b.group.rotation.z = -Math.sin(loopAngle) * 0.45;
          }
        } else {
          b.group.position.copy(b.perchPos);
          b.group.position.y += Math.sin(time * 2.5 + idx * 1.2) * 0.008;

          b.headGroup.rotation.y = Math.sin(time * 1.2 + idx * 1.8) * 0.22;
          b.headGroup.rotation.x = Math.sin(time * 1.8 + idx) * 0.12;

          b.leftWingPivot.rotation.z = 0;
          b.rightWingPivot.rotation.z = 0;
        }
      });

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

      // Keep pillar and signs nicely framed regardless of window width
      const newAspect = w / h;
      pillarGroup.position.x = newAspect < 1.3 ? Math.max(1.5, newAspect * 1.55) : 2.22;
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      starTexture.dispose();
      starItems.forEach((s) => s.mat.dispose());
      mastGeo.dispose();
      mastMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full select-none cursor-pointer"
      title="Hover over the birds to make them fly!"
    />
  );
}
