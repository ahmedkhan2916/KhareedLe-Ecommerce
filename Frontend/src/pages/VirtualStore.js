import { Suspense, lazy } from "react";

const VirtualShowroom = lazy(() => import("../virtual/VirtualShowroom"));

function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#04070f] text-white">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-300/40 border-t-cyan-300" />
      <p className="mt-4 text-xs uppercase tracking-[0.36em] text-cyan-200/80">
        Loading Virtual Showroom
      </p>
      <p className="mt-2 text-sm text-slate-300">
        Spinning up immersive lighting and textures.
      </p>
    </div>
  );
}

export default function VirtualStore() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <VirtualShowroom />
    </Suspense>
  );
}
