"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Ultra-lightweight top progress bar — appears instantly, completes in ~400ms.
 * No blocking. No overlay. Just a thin coloured line at the very top.
 */
export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const prevPath = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Start bar instantly
    setVisible(true);
    setWidth(15);

    // Animate to 85% quickly
    const step = () => {
      setWidth((w) => {
        if (w >= 85) return w;
        return w + (85 - w) * 0.12;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    // Complete & hide after 350ms
    timerRef.current = setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setWidth(100);
      setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 220);
    }, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: "linear-gradient(90deg, hsl(210 73% 40%), hsl(205 79% 55%))",
          transition: width === 100 ? "width 200ms ease-out" : "width 80ms linear",
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 8px hsl(210 73% 40% / 0.6)",
        }}
      />
    </div>
  );
}
