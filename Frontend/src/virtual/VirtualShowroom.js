import { Suspense, useEffect, useMemo, useRef, useState } from "react";



import * as THREE from "three";



import { Canvas, useFrame, useThree } from "@react-three/fiber";



import { OrbitControls, useCursor, useGLTF, useProgress } from "@react-three/drei";



import { a, useSpring } from "@react-spring/three";



import storeModel from "../assets/Models/store.glb";



import PhoneDemo from "../assets/Models/phone_samsung_s25.glb";



import ProductPanel from "./productpanel/ProductPanel";







function Store({ collidablesRef, maxAnisotropy }) {



  const { scene } = useGLTF(storeModel);



  const store = useMemo(() => scene.clone(true), [scene]);







  useEffect(() => {



    const box = new THREE.Box3().setFromObject(store);



    const center = box.getCenter(new THREE.Vector3());



    store.position.sub(center);







    const collidables = [];



    store.traverse((child) => {



      if (!child.isMesh) return;







      child.castShadow = true;



      child.receiveShadow = true;



      child.userData.clickable = true;



      child.userData.collidable = true;



      child.userData.originalMaterial = child.material.clone();
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
    () => new THREE.Vector3(16, isMobileViewport ? 1.05 : 0.8, -16.5),
    [isMobileViewport]
  );



  const baseScale = useMemo(
    () =>
      new THREE.Vector3(1, 1, 1).multiplyScalar(isMobileViewport ? 1.15 : 1),
    [isMobileViewport]
  );



  const baseRotationY = useRef(0);







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



    });



  }, [phone, maxAnisotropy]);







  useEffect(() => {



    const targetPosition = isActive



      ? [basePosition.x, basePosition.y + 0.3, basePosition.z]



      : basePosition.toArray();



    const targetScale = isActive



      ? baseScale.clone().multiplyScalar(1.4).toArray()



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



          : new THREE.Vector3(16, 0.8, -16.5);



        tmpDir.copy(camera.position).sub(phonePos).normalize();



        const closePos = phonePos.clone().add(tmpDir.multiplyScalar(2.2));



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



      camera.position.y = 1.6;



      if (controlsRef.current && phoneRef.current) {



        controlsRef.current.target.copy(phoneRef.current.position);



        controlsRef.current.update();



      }



      if (spotTargetRef.current && phoneRef.current) {



        spotTargetRef.current.position.copy(phoneRef.current.position);



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







    camera.position.y = 1.6;







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



  const [selectedShelf, setSelectedShelf] = useState(null);



  const [isActive, setIsActive] = useState(false);

  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });

  const [maxAnisotropy, setMaxAnisotropy] = useState(0);

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const cap = isMobileViewport ? 2.5 : 2;
    return Math.min(window.devicePixelRatio || 1, cap);
  }, [isMobileViewport]);

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



          camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 1.6, 6] }}



          shadows
          dpr={dpr}
          gl={{ antialias: true, powerPreference: "high-performance" }}



          onCreated={({ gl }) => {



            gl.outputColorSpace = THREE.SRGBColorSpace;



            gl.toneMapping = THREE.ACESFilmicToneMapping;



            gl.toneMappingExposure = 1.3;



            gl.physicallyCorrectLights = true;



            gl.shadowMap.enabled = true;



            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            setMaxAnisotropy(gl.capabilities.getMaxAnisotropy());



          }}



        >



          <color attach="background" args={[0xf2f2f2]} />







          <ambientLight intensity={0.9} />



          <directionalLight intensity={0.8} position={[5, 10, 5]} castShadow />



          <spotLight



            position={[16, 4, -14]}



            intensity={isActive ? 10 : 8}



            distance={10}



            angle={Math.PI / 9}



            penumbra={0.4}



            decay={1}



            castShadow



            target={spotTargetRef.current}



          />



          <spotLight



            position={[16.5, 2.2, -15.2]}



            intensity={3}



            color="#f5f5ff"



            distance={6}



            angle={Math.PI / 7}



            penumbra={0.7}



            decay={1}



            target={spotTargetRef.current}



          />



          <spotLight



            position={[16, 6, -16.5]}



            intensity={4}



            color="#ffffff"



            distance={12}



            angle={Math.PI / 10}



            penumbra={0.5}



            decay={1}



            target={spotTargetRef.current}



          />



          <spotLight



            position={[14.5, 3.2, -15.5]}



            intensity={isActive ? 6 : 0}



            color="#fff2d6"



            distance={8}



            angle={Math.PI / 6}



            penumbra={0.6}



            decay={1}



            target={spotTargetRef.current}



          />



          <primitive object={spotTargetRef.current} />







          <OrbitControls



            ref={controlsRef}



            makeDefault



            enableDamping



            enablePan={false}



            enableZoom={false}



            enableRotate



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



