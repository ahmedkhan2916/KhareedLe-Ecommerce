import React, { useEffect, useRef, useState } from "react";
import "../assets/Style/Explore.css";
import "../assets/Style/Headings.css";

const STATS = [
  { label: "Smartphones", value: 1000 },
  { label: "Laptops", value: 500 },
  { label: "Gaming Console's", value: 50 },
  { label: "Accessories", value: 1000 },
];

function ExploreContainer() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));

  useEffect(() => {
    const sectionNode = sectionRef.current;

    if (!sectionNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    const duration = 1800;
    const startTime = performance.now();

    const animateNumbers = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(
        STATS.map(({ value }) => Math.floor(value * easedProgress))
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animateNumbers);
      }
    };

    frameRef.current = requestAnimationFrame(animateNumbers);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="h-[60vh] pt-16 sm:h-screen">
      <div className="upperSection flex h-3/6 flex-col sm:flex-row">
        <div className="headingCont flex w-screen items-center justify-center">
          <h1 className="HeadingPlayFair w-4/5 text-3xl sm:text-6xl">
            Explore Hundreds of Electronics Products
          </h1>
        </div>

        <div className="rightupperSection grid w-screen grid-cols-2 gap-1 items-center justify-items-center sm:justify-center">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="rightDivs flex h-3/5 w-1/2 flex-col border-l-4 border-l-slate-500"
            >
              <div className="heading pl-3">
                <h2 className="text-3xl text-orange-500 sm:text-5xl">
                  {animatedStats[index]}+
                </h2>
              </div>
              <div className="para pl-3">
                <p className="text-lg">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreContainer;
