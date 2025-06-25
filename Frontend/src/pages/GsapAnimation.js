import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function GsapAnimation() {
  const container = useRef();

  useGSAP(() => {
    gsap.to('.box', {
      x: 360,
      duration: 1,
      backgroundColor: '#ff6f61',
      borderRadius: '50%',
      ease: 'power2.out',
    });
  }, { scope: container });

  return (
    <div ref={container} className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Hello, it's my GSAP</h1>

      <div className="box w-24 h-24 bg-blue-500 mt-5"></div>
    </div>
  );
}

export default GsapAnimation;
