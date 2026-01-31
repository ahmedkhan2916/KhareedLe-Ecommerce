import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import storeModel from "../assets/Models/store.glb";
import PhoneDemo from "../assets/Models/phone_samsung_s25.glb";
import ProductPanel from "./ProductPanel";

export default function VirtualShowroom() {
  const mountRef = useRef(null);
  const [selectedShelf, setSelectedShelf] = useState(null);

  // ===== MOVEMENT =====
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const direction = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const speed = 0.05;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ================= SCENE =================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    // ================= CAMERA =================
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 6);

    // ================= RENDERER =================
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);



    // ================= LIGHTS =================
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.physicallyCorrectLights = true;
    

//spotlight

const phoneSpotLight = new THREE.SpotLight(
  0xffffff,   // color
  6,          // intensity (increase for brightness)
  10,         // distance
  Math.PI / 8,// angle (smaller = more focused)
  0.3,        // penumbra (soft edge)
  1           // decay
);

phoneSpotLight.position.set(16, 4, -14); // ABOVE the phone
phoneSpotLight.castShadow = true;
scene.add(phoneSpotLight);
phoneSpotLight.intensity = 7;
phoneSpotLight.angle = Math.PI / 9;
phoneSpotLight.penumbra = 0.4;
renderer.toneMappingExposure = 1.3;



    

    // ================= CONTROLS =================
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.target.set(0, 1.6, 0);
    controls.update();

    // ================= LOAD STORE =================
    let storeScene = null;
    const loader = new GLTFLoader();

    loader.load(
      storeModel,
      (gltf) => {
        storeScene = gltf.scene;

storeScene.traverse((child) => {
  if (!child.isMesh) return;

  child.castShadow = true;
  child.receiveShadow = true;
  child.userData.clickable = true;
  child.userData.collidable = true;
  child.userData.originalMaterial = child.material.clone();

  let parent = child.parent;
  while (parent) {
    if (parent.name && parent.name.includes("Shelf_Mobile")) {
      child.userData.shelf = "Mobile Phones";
      child.userData.category = "mobile";
      break;
    }
    parent = parent.parent;
  }
});



        // Center model
        const box = new THREE.Box3().setFromObject(storeScene);
        const center = box.getCenter(new THREE.Vector3());
        storeScene.position.sub(center);

        scene.add(storeScene);
      },
      undefined,
      (err) => console.error("GLB load error", err)
    );

    // ================= RAYCASTING =================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const hoverMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc66,
      emissive: 0x332200,
    });

    let hovered = null;

    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (!storeScene) return;
      
      const hits = raycaster.intersectObjects(storeScene.children, true);

      if (hits.length > 0 && hits[0].object.userData.clickable) {
        const obj = hits[0].object;

        if (hovered && hovered !== obj) {
          hovered.material = hovered.userData.originalMaterial;
        }

        hovered = obj;
        obj.material = hoverMaterial;
      } else if (hovered) {
        hovered.material = hovered.userData.originalMaterial;
        hovered = null;
      }
    };

const onClick = () => {
  if (!hovered) return;

  console.log("Clicked mesh:", hovered.name);
  console.log("UserData:", hovered.userData);
  console.log("Shelf:", hovered.userData.shelf);

  setSelectedShelf(hovered.userData.name);
};



    // ================= MOVEMENT + COLLISION =================
    const collisionRay = new THREE.Raycaster();
    const collisionDistance = 0.6;

    const animate = () => {
      requestAnimationFrame(animate);

      direction.set(0, 0, 0);

      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      right.crossVectors(forward, camera.up).normalize();

      if (keys.current.w) direction.add(forward);
      if (keys.current.s) direction.sub(forward);
      if (keys.current.a) direction.sub(right);
      if (keys.current.d) direction.add(right);

      if (direction.length() > 0 && storeScene) {
        collisionRay.set(camera.position, direction.normalize());

        const collidables = [];
        storeScene.traverse(obj => {
          if (obj.userData.collidable) collidables.push(obj);
        });

        const hits = collisionRay.intersectObjects(collidables, true);

        if (hits.length === 0 || hits[0].distance > collisionDistance) {
          camera.position.addScaledVector(direction, speed);
        }
      }

      camera.position.y = 1.6;
      controls.target.copy(camera.position).add(forward);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();



    let phoneScene = null;

loader.load(
  PhoneDemo,
  (gltf) => {
    phoneScene = gltf.scene;
    // ✅ Scale (phones are usually huge after export)
    phoneScene.scale.set(1, 1, 1);

    // ✅ Position on desk / shelf (adjust later)
    phoneScene.position.set(16, 0.8, -16.5);

    // ✅ Name (VERY IMPORTANT for interaction)
    phoneScene.name = "SamsungGalaxyS25";

    // ✅ Make meshes clickable
    phoneScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true; 

        child.userData.clickable = true;
        child.userData.type = "phone";
        child.userData.productKey = "SamsungGalaxyS25";
        console.log("Phone mesh loaded:", phoneScene.name);
      }
    });

    

    scene.add(phoneScene);
  },
  undefined,
  (err) => console.error("Phone load error", err)
);






    // ================= EVENTS =================
    const onKeyDown = (e) => {
      if (keys.current[e.key?.toLowerCase()] !== undefined) {
        keys.current[e.key.toLowerCase()] = true;
      }
    };

    const onKeyUp = (e) => {
      if (keys.current[e.key?.toLowerCase()] !== undefined) {
        keys.current[e.key.toLowerCase()] = false;
      }
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    // ================= CLEANUP =================
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
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
    {/* CANVAS CONTAINER */}
    <div
      ref={mountRef}
      style={{
        flex: 1,
        height: "100%",
        position: "relative",
        zIndex: 1, // 👈 canvas stays below panel
      }}
    />

    {/* PRODUCT PANEL */}
    {selectedShelf && (
      <div
        style={{
          width: "320px",
          height: "100%",
          zIndex: 2, // 👈 panel above canvas
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
