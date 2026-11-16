import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

/**
 * Creates the exact 3D bird model from the Experience page (MesqPillarScene)
 * With spherical cream body, cone beak, beady eyes, curved wings, accessories, and claws.
 */
function createInteractiveBirdModel({ hat = "none", scale = 1.0 }) {
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

  // 1. Body
  const bodyGeo = new THREE.SphereGeometry(0.24, 16, 16);
  bodyGeo.scale(0.9, 1.05, 1.25);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 0.24, 0);
  group.add(body);

  // 2. Head
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.42, 0.18);

  const headGeo = new THREE.SphereGeometry(0.17, 16, 16);
  const head = new THREE.Mesh(headGeo, bodyMat);
  headGroup.add(head);

  // 3. Beak
  const beakGeo = new THREE.ConeGeometry(0.065, 0.18, 8);
  beakGeo.rotateX(Math.PI / 2);
  const beak = new THREE.Mesh(beakGeo, beakMat);
  beak.position.set(0, -0.02, 0.22);
  headGroup.add(beak);

  // 4. Eyes
  [-1, 1].forEach((dir) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), eyeMat);
    eye.position.set(dir * 0.11, 0.04, 0.13);
    headGroup.add(eye);
  });

  // 5. Accessories matching Experience page
  if (hat === "party") {
    const partyMat = new THREE.MeshStandardMaterial({ color: 0xff4fa6, roughness: 0.4 });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.26, 10), partyMat);
    cone.position.set(0, 0.26, 0);
    headGroup.add(cone);

    const pompom = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd84d })
    );
    pompom.position.set(0, 0.38, 0);
    headGroup.add(pompom);
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

  // 6. 3D Wings with smooth volume and rounded contours (no razor-thin line edges)
  const leftWingPivot = new THREE.Group();
  leftWingPivot.position.set(-0.20, 0.25, 0.0);

  const rightWingPivot = new THREE.Group();
  rightWingPivot.position.set(0.20, 0.25, 0.0);

  // Aerodynamic 3D teardrop wing geometry with soft bevel
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.quadraticCurveTo(0.12, 0.18, 0.18, 0.42);
  wingShape.quadraticCurveTo(0.08, 0.52, 0.0, 0.48);
  wingShape.quadraticCurveTo(-0.12, 0.26, 0, 0);

  const wingGeo = new THREE.ExtrudeGeometry(wingShape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 4,
  });
  // Center geometry slightly behind pivot so it extends back along body
  wingGeo.translate(0, -0.24, -0.017);

  const leftWing = new THREE.Mesh(wingGeo, wingMat);
  // Resting: folded naturally back along bird's left flank
  leftWing.rotation.set(0.24, -0.15, 0.14);
  leftWing.scale.set(0.75, 0.85, 0.75);
  leftWingPivot.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, wingMat);
  // Resting: folded naturally back along bird's right flank
  rightWing.rotation.set(0.24, 0.15, -0.14);
  rightWing.scale.set(0.75, 0.85, 0.75);
  rightWingPivot.add(rightWing);

  group.add(leftWingPivot);
  group.add(rightWingPivot);

  // 7. Tail
  const tailGeo = new THREE.ConeGeometry(0.09, 0.26, 6);
  tailGeo.rotateX(-Math.PI / 2.6);
  const tail = new THREE.Mesh(tailGeo, new THREE.MeshStandardMaterial({ color: 0x4a4744 }));
  tail.position.set(0, 0.26, -0.32);
  group.add(tail);

  // 8. Legs & Claws
  const legMat = new THREE.MeshStandardMaterial({ color: 0xf7a934 });
  [-1, 1].forEach((dir) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.16, 6), legMat);
    leg.position.set(dir * 0.09, 0.08, 0);
    group.add(leg);
    const claw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.08), legMat);
    claw.position.set(dir * 0.09, 0.005, 0.02);
    group.add(claw);
  });

  group.scale.set(scale, scale, scale);

  return {
    group,
    headGroup,
    leftWingPivot,
    rightWingPivot,
  };
}

/**
 * 3D Three.js Perched Bird with exact geometry, materials, and flight behaviour
 * matching the Experience page traffic mast birds!
 */
export function PerchedBird({
  type = "sunglasses", // "sunglasses" | "party"
  scale = 1.0,
  flip = false,
  className = "",
  style = {},
}) {
  const mountRef = useRef(null);
  const [isFlyingState, setIsFlyingState] = useState(false);

  // Bird internal 3D state
  const birdRef = useRef(null);
  const isFlyingRef = useRef(false);
  const flightProgressRef = useRef(0);

  // Flight trigger: only called when user hovers or taps on the bird
  const launchFlight = useCallback(() => {
    if (isFlyingRef.current) return;
    isFlyingRef.current = true;
    flightProgressRef.current = 0;
    setIsFlyingState(true);
  }, []);

  // Three.js Scene Setup & Animation
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 460;
    const height = 360;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.06, 3.3);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    // Completely prevent browser outline/focus borders or click highlight boxes
    renderer.domElement.style.outline = "none";
    renderer.domElement.style.border = "none";
    renderer.domElement.style.boxShadow = "none";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.userSelect = "none";
    renderer.domElement.style.webkitTapHighlightColor = "transparent";
    container.appendChild(renderer.domElement);

    // Warm, vibrant lighting matching Experience page
    const ambientLight = new THREE.AmbientLight(0xfffbf0, 1.45);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.85);
    sunLight.position.set(1.5, 3.2, 2.5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xb8acff, 0.9);
    rimLight.position.set(-2.0, -1.0, -1.5);
    scene.add(rimLight);

    // Create 3D Bird scaled precisely for the camera distance
    const bird = createInteractiveBirdModel({
      hat: type,
      scale: 0.72 * scale,
    });
    birdRef.current = bird;

    // Perch Anchor
    const perchY = -0.56;
    const baseRotY = flip ? Math.PI * 0.16 : -Math.PI * 0.16;
    bird.group.position.set(0, perchY, 0);
    bird.group.rotation.set(0, baseRotY, 0);
    scene.add(bird.group);

    let animationFrameId;
    const clock = new THREE.Clock();

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible && !isFlyingRef.current) {
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      if (isFlyingRef.current) {
        // Smooth flight loop (~2.4s flight with graceful physics)
        flightProgressRef.current += delta * 0.42;
        const p = flightProgressRef.current;

        if (p >= 1.0) {
          isFlyingRef.current = false;
          flightProgressRef.current = 0;
          setIsFlyingState(false);
          bird.group.position.set(0, perchY, 0);
          bird.group.rotation.set(0, baseRotY, 0);
          bird.leftWingPivot.rotation.set(0, 0, 0);
          bird.rightWingPivot.rotation.set(0, 0, 0);
        } else {
          // Smooth bell envelope: 0 at p=0, reaches 1, returns to 0 at p=1
          const env = Math.sin(p * Math.PI);
          const loopAngle = p * Math.PI * 2;

          // Continuous 3D flight arc: zero velocity and zero offset at takeoff (p=0) and touchdown (p=1)
          const flightArcX = (flip ? -1 : 1) * Math.sin(loopAngle) * Math.sqrt(env) * 0.68;
          const flightArcY = Math.pow(env, 1.6) * 0.76;
          const flightArcZ = (1 - Math.cos(loopAngle)) * 0.38 * env;

          bird.group.position.set(flightArcX, perchY + flightArcY, flightArcZ);

          // Graceful 3D wing flapping that starts from 0, flaps in the air, and smoothly folds down on landing
          const flap = Math.sin(time * 26) * 0.75 * env;
          bird.leftWingPivot.rotation.z = flap;
          bird.rightWingPivot.rotation.z = -flap;
          bird.leftWingPivot.rotation.y = flap * 0.22;
          bird.rightWingPivot.rotation.y = -flap * 0.22;

          // Continuous banking roll, pitch and yaw with exact zero offset at p=0 and p=1
          const rotYOffset = (flip ? -1 : 1) * Math.sin(loopAngle) * 0.85 * env;
          const rotZOffset = (flip ? 1 : -1) * Math.sin(loopAngle) * 0.35 * env;
          const rotXOffset = -Math.cos(p * Math.PI) * 0.22 * env;

          bird.group.rotation.set(rotXOffset, baseRotY + rotYOffset, rotZOffset);
        }
      } else {
        // Idle behaviour: curious head glances and subtle breathing bob
        bird.group.position.set(0, perchY + Math.sin(time * 2.8) * 0.012, 0);
        bird.group.rotation.set(0, baseRotY, 0);

        bird.headGroup.rotation.y = Math.sin(time * 1.3) * 0.24;
        bird.headGroup.rotation.x = Math.sin(time * 1.9) * 0.12;

        bird.leftWingPivot.rotation.set(0, 0, 0);
        bird.rightWingPivot.rotation.set(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type, scale, flip]);

  const handleClick = (e) => {
    e.stopPropagation();
    launchFlight();
  };

  return (
    <div
      className={`relative select-none inline-block cursor-pointer ${className}`}
      style={{
        width: 48,
        height: 52,
        outline: "none",
        border: "none",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onClick={handleClick}
      onTouchStart={handleClick}
      onMouseEnter={() => {
        if (!isFlyingRef.current) launchFlight();
      }}
    >
      {/* 3D Three.js Bird Canvas centered horizontally and vertically right above the letter perch */}
      <div
        ref={mountRef}
        className="absolute pointer-events-none"
        style={{
          width: 460,
          height: 360,
          bottom: -84,
          left: "50%",
          transform: "translateX(-50%)",
          outline: "none",
          border: "none",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
          zIndex: isFlyingState ? 50 : 30,
        }}
      />
    </div>
  );
}
