import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function OrbitFloatCube() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.15;
    ref.current.rotation.y += 0.005;
  });

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry />
        <meshStandardMaterial color="#eab308" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight />
      <OrbitFloatCube />
    </Canvas>
  );
}
