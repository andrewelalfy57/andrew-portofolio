"use client";

import { PropsWithChildren, useRef } from "react";

type MagneticProps = PropsWithChildren<{
  strength?: number; // 0.0 - 1.0
}>;

export function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const moveX = (x / (rect.width / 2)) * 6 * strength;
    const moveY = (y / (rect.height / 2)) * 6 * strength;
    ref.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = `translate3d(0,0,0)`;
  }

  return (
    <div
      ref={ref}
      className="inline-block will-change-transform transition-transform duration-150 ease-out"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
