import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { Environment } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

import * as THREE from "three";



import { Canvas, useFrame, useThree } from "@react-three/fiber";



import { OrbitControls, useCursor, useGLTF, useProgress } from "@react-three/drei";



import { a, useSpring } from "@react-spring/three";

import ProductPanel from "./productpanel/ProductPanel";

const storeModel = "/models/store2.glb";
const PhoneDemo = "/models/iphone17prodemo.glb";

function canInitializeWebGL() {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch (error) {
    return false;
  }
}







function Store({ collidablesRef, maxAnisotropy }) {



  const { scene } = useGLTF(storeModel);



  const store = useMemo(() => scene.clone(true), [scene]);







  useEffect(() => {



    const box = new THREE.Box3().setFromObject(store);
    if (!box.isEmpty()) {
      const center = box.getCenter(new THREE.Vector3());
      if (
        Number.isFinite(center.x) &&
        Number.isFinite(center.y) &&
        Number.isFinite(center.z)
      ) {
        store.position.sub(center);
      }
    }







    const collidables = [];



    store.traverse((child) => {



      if (!child.isMesh) return;







      child.castShadow = true;



      child.receiveShadow = true;
      child.frustumCulled = false;



      child.userData.clickable = true;



      child.userData.collidable = true;



      const materials = Array.isArray(child.material)
        ? child.material
        : child.material
        ? [child.material]
        : [];
      child.userData.originalMaterial = materials.map((material) =>
        material?.clone ? material.clone() : material
      );
      if (maxAnisotropy && materials.length > 0) {
        const texKeys = [
          "map",
          "normalMap",
          "roughnessMap",
          "metalnessMap",
          "aoMap",
          "emissiveMap",
        ];
        materials.forEach((material) => {
          if (!material) return;
          texKeys.forEach((key) => {
            const tex = material[key];
            if (tex) {
              tex.anisotropy = maxAnisotropy;
              tex.needsUpdate = true;
            }
          });
        });
      }







      let parent = child.parent;



      while (parent) {



        if (parent.name && parent.name.includes("Shelf_Mobile")) {



          child.userData.shelf = "Mobile Phones";



          child.userData.category = "mobile";



          break;



        }



        parent = parent.parent;



      }







      if (child.userData.collidable) collidables.push(child);



    });







    collidablesRef.current = collidables;



  }, [store, collidablesRef, maxAnisotropy]);







  return <primitive object={store} />;



}







function Phone({
  isActive,
  setIsActive,
  phoneRef,
  onToggle,
  isMobileViewport,
  maxAnisotropy,
}) {



  const { scene } = useGLTF(PhoneDemo);



  const phone = useMemo(() => scene.clone(true), [scene]);



  const basePosition = useMemo(
    () => new THREE.Vector3(0, isMobileViewport ? -1.16 : -1.22, 0),
    [isMobileViewport]
  );



  const baseScale = useMemo(
    () =>
      new THREE.Vector3(1, 1, 1).multiplyScalar(isMobileViewport ? 1.15 : 1),
    [isMobileViewport]
  );



  const baseRotationY = useRef(-0.18);







  const [{ position, scale }, api] = useSpring(() => ({



    position: basePosition.toArray(),



    scale: baseScale.toArray(),



    config: { mass: 1, tension: 170, friction: 20 },



  }));







  useEffect(() => {



    phone.traverse((child) => {



      if (!child.isMesh) return;



      child.castShadow = true;



      child.receiveShadow = true;



      child.userData.type = "phone";



      child.userData.productKey = "SamsungGalaxyS25";
      if (maxAnisotropy && child.material) {
        const texKeys = [
          "map",
          "normalMap",
          "roughnessMap",
          "metalnessMap",
          "aoMap",
          "emissiveMap",
        ];
        texKeys.forEach((key) => {
          const tex = child.material[key];
          if (tex) {
            tex.anisotropy = maxAnisotropy;
            tex.needsUpdate = true;
          }
        });
      }
      if (!child.userData._origEmissive && child.material) {
        const mat = child.material;
        child.userData._origEmissive = mat.emissive ? mat.emissive.clone() : null;
        child.userData._origEmissiveIntensity = mat.emissiveIntensity ?? 0;
      }
      if (child.material) {
        const mat = child.material;
        if (typeof mat.roughness === "number") {
          mat.roughness = Math.max(0.18, mat.roughness * 0.72);
        }
        if (typeof mat.metalness === "number") {
          mat.metalness = Math.min(1, mat.metalness * 0.9);
        }
        if (typeof mat.envMapIntensity === "number") {
          mat.envMapIntensity = Math.max(1.2, mat.envMapIntensity);
        }
        mat.needsUpdate = true;
      }



    });



  }, [phone, maxAnisotropy]);







  useEffect(() => {



    const targetPosition = isActive



      ? [basePosition.x, basePosition.y + 0.3, basePosition.z]



      : basePosition.toArray();



    const targetScale = isActive



      ? baseScale.clone().multiplyScalar(1.18).toArray()



      : baseScale.toArray();







    api.start({ position: targetPosition, scale: targetScale });



  }, [isActive, api, basePosition, baseScale]);







  const [hovered, setHovered] = useState(false);
  const [clickShine, setClickShine] = useState(false);
  const clickShineTimerRef = useRef(null);



  useCursor(hovered);

  useEffect(() => {
    const shouldShine = hovered || clickShine;
    phone.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const mat = child.material;
      if (!mat.emissive) return;

      if (shouldShine) {
        mat.emissive.setHex(0xffcc88);
        mat.emissiveIntensity = 0.04;
      } else {
        if (child.userData._origEmissive) {
          mat.emissive.copy(child.userData._origEmissive);
        }
        mat.emissiveIntensity = child.userData._origEmissiveIntensity ?? 0;
      }
    });
  }, [hovered, clickShine, phone]);







  useFrame(() => {



    if (!phoneRef.current) return;



    if (isActive) {



      phoneRef.current.rotation.y += 0.002;



    } else {



      phoneRef.current.rotation.y = THREE.MathUtils.lerp(



        phoneRef.current.rotation.y,



        baseRotationY.current,



        0.12



      );



    }



  });







  return (



    <a.group



      ref={phoneRef}



      position={position}
      rotation={[0, baseRotationY.current, 0]}



      scale={scale}



      onPointerOver={(e) => {



        e.stopPropagation();



        setHovered(true);



      }}



      onPointerOut={() => setHovered(false)}



      onClick={(e) => {
        if (clickShineTimerRef.current) {
          clearTimeout(clickShineTimerRef.current);
        }
        setClickShine(true);
        clickShineTimerRef.current = setTimeout(() => {
          setClickShine(false);
        }, 450);



        e.stopPropagation();



        setIsActive((prev) => {



          const next = !prev;



          if (onToggle) onToggle(next);



          return next;



        });



      }}



    >



      <primitive object={phone} />



    </a.group>



  );



}







function Movement({



  keysRef,



  collidablesRef,



  controlsRef,



  phoneRef,



  spotTargetRef,



  isActive,



  cameraPulseRef,



}) {
  const CAMERA_HEIGHT = -1.0;



  const { camera } = useThree();



  const direction = useMemo(() => new THREE.Vector3(), []);



  const forward = useMemo(() => new THREE.Vector3(), []);



  const right = useMemo(() => new THREE.Vector3(), []);



  const collisionRay = useMemo(() => new THREE.Raycaster(), []);



  const collisionDistance = 0.6;



  const speed = 0.10;



  const pulseState = useRef({



    id: 0,



    phase: "idle",



    t0: 0,



    start: new THREE.Vector3(),



    close: new THREE.Vector3(),



    saved: new THREE.Vector3(),



  });



  const tmpDir = useMemo(() => new THREE.Vector3(), []);
  const focusTarget = useMemo(() => new THREE.Vector3(), []);
  const focusDistance = 3.4;
  const focusTargetYOffset = 0.35;







  const updateCameraPulse = () => {



    const pulse = cameraPulseRef?.current;



    if (!pulse) return;



    if (pulse.id !== pulseState.current.id) {



      pulseState.current.id = pulse.id;



      pulseState.current.t0 = performance.now();







      if (pulse.action === "focus") {



        pulseState.current.phase = "in";



        pulseState.current.start.copy(camera.position);



        pulseState.current.saved.copy(camera.position);







        const phonePos = phoneRef.current



          ? phoneRef.current.position



          : new THREE.Vector3(0, -1.22, 0);



        focusTarget.copy(phonePos).setY(phonePos.y + focusTargetYOffset);
        tmpDir.copy(camera.position).sub(focusTarget).normalize();



        const closePos = focusTarget.clone().add(tmpDir.multiplyScalar(focusDistance));



        pulseState.current.close.copy(closePos);



      } else if (pulse.action === "unfocus") {



        pulseState.current.phase = "out";



        pulseState.current.start.copy(camera.position);



      }



    }



  };







  useFrame(() => {



    direction.set(0, 0, 0);







    updateCameraPulse();







    const now = performance.now();



    const inDur = 500;



    const outDur = 600;



    const state = pulseState.current;



    const animating = state.phase !== "idle";







    if (controlsRef.current) {



      controlsRef.current.enabled = !animating;



    }







    if (animating) {



      if (state.phase === "in") {



        const t = Math.min((now - state.t0) / inDur, 1);



        camera.position.lerpVectors(state.start, state.close, t);



        if (t >= 1) {



          state.phase = "hold";



        }



      } else if (state.phase === "out") {



        const t = Math.min((now - state.t0) / outDur, 1);



        camera.position.lerpVectors(state.start, state.saved, t);



        if (t >= 1) {



          state.phase = "idle";



        }



      }



    }







    if (isActive) {



      camera.position.y = CAMERA_HEIGHT;



      if (controlsRef.current && phoneRef.current) {



        controlsRef.current.target
          .copy(phoneRef.current.position)
          .setY(phoneRef.current.position.y + focusTargetYOffset);



        controlsRef.current.update();



      }



      if (spotTargetRef.current && phoneRef.current) {



        spotTargetRef.current.position
          .copy(phoneRef.current.position)
          .setY(phoneRef.current.position.y + focusTargetYOffset);



      }



      return;



    }







    camera.getWorldDirection(forward);



    forward.y = 0;



    forward.normalize();







    right.crossVectors(forward, camera.up).normalize();







    if (keysRef.current.w) direction.add(forward);



    if (keysRef.current.s) direction.sub(forward);



    if (keysRef.current.a) direction.sub(right);



    if (keysRef.current.d) direction.add(right);







    const collidables = collidablesRef.current || [];



    if (direction.length() > 0 && collidables.length > 0) {



      collisionRay.set(camera.position, direction.normalize());



      const hits = collisionRay.intersectObjects(collidables, true);



      if (hits.length === 0 || hits[0].distance > collisionDistance) {



        camera.position.addScaledVector(direction, speed);



      }



    }







    camera.position.y = CAMERA_HEIGHT;







    if (controlsRef.current) {



      if (isActive && phoneRef.current) {



        controlsRef.current.target.copy(phoneRef.current.position);



      } else {



        controlsRef.current.target.copy(camera.position).add(forward);



      }



      controlsRef.current.update();



    }







    if (spotTargetRef.current && phoneRef.current) {



      spotTargetRef.current.position.copy(phoneRef.current.position);



    }



  });







  return null;



}







export default function VirtualShowroom() {
  const CAMERA_HEIGHT = -1.0;



  const [selectedShelf, setSelectedShelf] = useState(null);



  const [isActive, setIsActive] = useState(false);

  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });

  const [maxAnisotropy, setMaxAnisotropy] = useState(0);

  const webglReady = useMemo(() => canInitializeWebGL(), []);
  const qualityPreset = useMemo(() => {
    if (typeof window === "undefined") return "balanced";
    const forced = new URLSearchParams(window.location.search).get("quality");
    if (forced === "low" || forced === "balanced" || forced === "high") return forced;

    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    if (isMobileViewport) return "low";
    if (memory <= 2 || cores <= 2) return "low";
    if (memory >= 8 && cores >= 8) return "high";
    return "balanced";
  }, [isMobileViewport]);

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const capByQuality = {
      low: isMobileViewport ? 1.25 : 1.5,
      balanced: isMobileViewport ? 1.6 : 2,
      high: isMobileViewport ? 2 : 2.5,
    };
    const cap = capByQuality[qualityPreset] ?? 1.5;
    return Math.min(window.devicePixelRatio || 1, cap);
  }, [isMobileViewport, qualityPreset]);

  useEffect(() => {
    const onResize = () => {
      setIsMobileViewport(window.innerWidth <= 768);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);



  const keysRef = useRef({ w: false, a: false, s: false, d: false });



  const collidablesRef = useRef([]);



  const phoneRef = useRef(null);



  const controlsRef = useRef(null);



  const spotTargetRef = useRef(new THREE.Object3D());



  const cameraPulseRef = useRef({ id: 0, action: "focus" });



  const { active, progress } = useProgress();



  const [showLoader, setShowLoader] = useState(true);



  const loaderStartRef = useRef(performance.now());











  useEffect(() => {



    if (isActive) setSelectedShelf("Shelf_Mobile");



  }, [isActive]);







  useEffect(() => {



    if (active) {



      loaderStartRef.current = performance.now();



      setShowLoader(true);



      return;



    }







    if (progress < 100) return;







    const minDurationMs = 3000;



    const elapsed = performance.now() - loaderStartRef.current;



    const remaining = Math.max(minDurationMs - elapsed, 0);







    const timer = window.setTimeout(() => {



      setShowLoader(false);



    }, remaining);







    return () => window.clearTimeout(timer);



  }, [active, progress]);







  useEffect(() => {



    const onKeyDown = (e) => {



      const key = e.key?.toLowerCase();



      if (keysRef.current[key] !== undefined) keysRef.current[key] = true;



    };







    const onKeyUp = (e) => {



      const key = e.key?.toLowerCase();



      if (keysRef.current[key] !== undefined) keysRef.current[key] = false;



    };







    window.addEventListener("keydown", onKeyDown);



    window.addEventListener("keyup", onKeyUp);







    return () => {



      window.removeEventListener("keydown", onKeyDown);



      window.removeEventListener("keyup", onKeyUp);



    };



  }, []);

  if (!webglReady) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b1020",
          color: "#e2e8f0",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", fontWeight: 600 }}>3D view is unavailable</p>
          <p style={{ marginTop: "8px", opacity: 0.85 }}>
            WebGL could not be initialized. Enable hardware acceleration or try another
            browser.
          </p>
        </div>
      </div>
    );
  }

  return (



    <div



      style={{



        display: "flex",



        width: "100vw",



        height: "100vh",



        overflow: "hidden",



        position: "relative",



      }}



    >



      <div style={{ flex: 1, height: "100%", position: "relative", zIndex: 1 }}>



<Canvas
  camera={{ fov: 60, near: 0.1, far: 1000, position: [0, CAMERA_HEIGHT, 6] }}
  shadows
  dpr={dpr}
  gl={{
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  }}
  onCreated={({ gl }) => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.95; // Lower exposure for more natural showroom tones
    gl.physicallyCorrectLights = true;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    setMaxAnisotropy(gl.capabilities.getMaxAnisotropy());
  }}
>
  {/* Background */}
  <color attach="background" args={["#f2f2f2"]} />

  {/* 🔥 HDR Environment (BIG UPGRADE) */}
<Environment
  files="/hdr/warehouse.hdr"
  background={false}
/>

  {/* Soft base light, avoid washed-out whites */}
  <ambientLight intensity={0.18} />

  <hemisphereLight
    args={["#f8f9fb", "#c2cad2", 0.24]}
  />

  {/* Main ceiling key light */}
  <spotLight
    position={[16, 5.8, -16.2]}
    intensity={7.2}
    distance={11}
    angle={Math.PI / 8}
    penumbra={0.85}
    decay={1.8}
    castShadow
    shadow-bias={-0.00008}
    shadow-normalBias={0.02}
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
    target={spotTargetRef.current}
  />

  {/* Gentle showroom fill from opposite sides */}
  <pointLight position={[-10, 3.2, 3]} intensity={0.58} distance={26} color="#fff6ea" />
  <pointLight position={[10, 2.8, -6]} intensity={0.44} distance={22} color="#f2f7ff" />

  <primitive object={spotTargetRef.current} />

  <OrbitControls
    ref={controlsRef}
    makeDefault
    enableDamping
    enablePan={false}
    enableZoom={false}
  />

  <Suspense fallback={null}>
    <Store
      collidablesRef={collidablesRef}
      maxAnisotropy={maxAnisotropy}
    />

    <Phone
      isActive={isActive}
      setIsActive={setIsActive}
      phoneRef={phoneRef}
      isMobileViewport={isMobileViewport}
      maxAnisotropy={maxAnisotropy}
      onToggle={(next) => {
        cameraPulseRef.current = {
          id: performance.now(),
          action: next ? "focus" : "unfocus",
        };
      }}
    />
  </Suspense>

  <Movement
    keysRef={keysRef}
    collidablesRef={collidablesRef}
    controlsRef={controlsRef}
    phoneRef={phoneRef}
    spotTargetRef={spotTargetRef}
    isActive={isActive}
    cameraPulseRef={cameraPulseRef}
  />

  {/* 🔥 OPTIONAL BLOOM */}
  {/* <EffectComposer>
    <Bloom
      intensity={0.5}
      luminanceThreshold={0.25}
      mipmapBlur
    />
  </EffectComposer> */}

</Canvas>



      </div>











      {showLoader && (



        <div



          style={{



            position: "absolute",



            inset: 0,



            display: "flex",



            alignItems: "center",



            justifyContent: "center",



            background: "rgba(4, 7, 14, 0.85)",



            backdropFilter: "blur(6px)",



            zIndex: 3,



          }}



        >



          <div



            style={{



              display: "flex",



              flexDirection: "column",



              alignItems: "center",



              gap: "14px",



              padding: "20px 24px",



              borderRadius: "16px",



              border: "1px solid rgba(34, 211, 238, 0.35)",



              background: "rgba(0, 0, 0, 0.6)",



              color: "#e2e8f0",



              textAlign: "center",



              boxShadow: "0 0 45px rgba(56, 189, 248, 0.25)",



            }}



          >



            <div



              className="animate-spin"



              style={{



                height: "42px",



                width: "42px",



                borderRadius: "999px",



                border: "2px solid rgba(148, 163, 184, 0.35)",



                borderTopColor: "#67e8f9",



              }}



            />



            <div>



              <p



                style={{



                  fontSize: "11px",



                  textTransform: "uppercase",



                  letterSpacing: "0.3em",



                  color: "rgba(103, 232, 249, 0.9)",



                }}



              >



                Streaming 3D Environment



              </p>



              <p style={{ marginTop: "6px", fontSize: "14px" }}>



                {Math.round(progress)}% loaded



              </p>



            </div>



          </div>



        </div>



      )}







      {selectedShelf && (



        <div



          style={{



            width: "320px",



            height: "100%",



            zIndex: 2,



            background: "#fff",



          }}



        >



          <ProductPanel



            shelf={selectedShelf}



            onClose={() => setSelectedShelf(null)}


          />
        </div>
      )}
    </div>
  );
}
