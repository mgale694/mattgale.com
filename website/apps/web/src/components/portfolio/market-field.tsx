import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Abstract, deterministic line study; decorative, never presented as live market data. */
export function MarketField({
  variant = "hero",
  paused = false,
  className,
}: {
  variant?: "hero" | "about" | "contact";
  paused?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let width = 0,
      height = 0,
      frame = 0,
      lastTime = 0,
      phase = 0;
    let visible = false,
      disposed = false;
    const pointer = { x: 0.62, y: 0.48 };
    const target = { ...pointer };
    const draw = () => {
      const styles = getComputedStyle(canvas);
      const ink = styles.getPropertyValue("--field-line").trim();
      const accent = styles.getPropertyValue("--signal").trim();
      context.clearRect(0, 0, width, height);
      const isHero = variant === "hero";
      const count = isHero ? 26 : 32;
      // Each curve passes through a shared pivot, then diverges like a family of scenarios.
      const point = (x: number, line: number) => {
        const n = (line - count / 2) / count;
        const pivot = pointer.x;
        const distance = x - pivot;
        const spread = Math.atan(distance * 4.8) * n * (isHero ? 1.06 : 1.4);
        const sweep =
          (Math.sin(x * 7.2 + phase * 0.3) -
            Math.sin(pivot * 7.2 + phase * 0.3)) *
          (isHero ? 0.12 : 0.075);
        const wave =
          Math.sin(x * 11 + line * 0.36 + phase) *
          distance *
          (isHero ? 0.07 : 0.018);
        return (pointer.y + spread + sweep + wave) * height;
      };
      if (isHero) {
        context.strokeStyle = ink;
        context.globalAlpha = 0.1;
        context.lineWidth = 0.7;
        context.setLineDash([2, 6]);
        for (let x = width * 0.15; x < width; x += width * 0.2) {
          context.beginPath();
          context.moveTo(x, 0);
          context.lineTo(x, height);
          context.stroke();
        }
        for (let y = height * 0.25; y < height; y += height * 0.25) {
          context.beginPath();
          context.moveTo(0, y);
          context.lineTo(width, y);
          context.stroke();
        }
      }
      for (let line = 0; line < count; line++) {
        const red = line % 8 === 2;
        context.strokeStyle = red ? accent : ink;
        context.globalAlpha = red
          ? 0.55
          : isHero
            ? 0.19 + (line % 4) * 0.065
            : 0.16;
        context.lineWidth = red ? 0.9 : 0.65;
        context.setLineDash(line % 4 === 0 ? [1, 5] : []);
        context.beginPath();
        for (let step = 0; step <= 160; step++) {
          const x = step / 160;
          const y = point(x, line);
          // Include the exact common point between samples, even while it is moving.
          if (step > 0 && (step - 1) / 160 < pointer.x && x >= pointer.x)
            context.lineTo(pointer.x * width, pointer.y * height);
          if (step === 0) context.moveTo(0, y);
          else context.lineTo(x * width, y);
        }
        context.stroke();
        if (line % 3 === 0) {
          for (let dot = 1; dot < (isHero ? 8 : 3); dot++) {
            const x = (dot * 0.137 + line * 0.031) % 0.94;
            context.globalAlpha = red ? 0.9 : 0.65;
            context.fillStyle = red ? accent : ink;
            context.beginPath();
            context.arc(
              x * width,
              point(x, line),
              red ? 2.4 : 1.6,
              0,
              Math.PI * 2,
            );
            context.fill();
          }
        }
      }
      const px = width * pointer.x,
        py = height * pointer.y;
      context.setLineDash([]);
      context.strokeStyle = accent;
      context.globalAlpha = 0.2;
      context.lineWidth = 0.7;
      [18, 32].forEach((radius) => {
        context.beginPath();
        context.arc(px, py, radius, 0, Math.PI * 2);
        context.stroke();
      });
      context.fillStyle = accent;
      context.globalAlpha = 1;
      context.beginPath();
      context.arc(px, py, isHero ? 5 : 3, 0, Math.PI * 2);
      context.fill();
    };
    const tick = (time: number) => {
      if (disposed) return;
      if (time - lastTime > 32) {
        const elapsed = Math.min(time - lastTime, 50);
        const follow = 1 - Math.exp(-elapsed / 85);
        pointer.x += (target.x - pointer.x) * follow;
        pointer.y += (target.y - pointer.y) * follow;
        phase += elapsed * 0.00013;
        lastTime = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      draw();
      if (visible && !document.hidden && !motion.matches && !paused) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const themeObserver = new MutationObserver(sync);
    const onPointer = (event: PointerEvent) => {
      if (!finePointer.matches || motion.matches || paused) return;
      const bounds = canvas.getBoundingClientRect();
      target.x = Math.max(
        0.02,
        Math.min(0.98, (event.clientX - bounds.left) / bounds.width),
      );
      target.y = Math.max(
        0.02,
        Math.min(0.98, (event.clientY - bounds.top) / bounds.height),
      );
    };
    const pointerSurface =
      variant === "hero" ? (canvas.closest(".hero") ?? canvas) : canvas;
    const onLeave = () => {
      target.x = 0.62;
      target.y = 0.48;
    };
    resize.observe(canvas);
    observer.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    pointerSurface.addEventListener("pointermove", onPointer as EventListener);
    pointerSurface.addEventListener("pointerleave", onLeave);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      themeObserver.disconnect();
      pointerSurface.removeEventListener(
        "pointermove",
        onPointer as EventListener,
      );
      pointerSurface.removeEventListener("pointerleave", onLeave);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [variant, paused]);
  return (
    <canvas
      ref={canvasRef}
      className={cn("market-field", `market-field--${variant}`, className)}
      aria-hidden="true"
    />
  );
}
