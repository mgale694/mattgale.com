import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Content is readable by default; motion only enhances entry into the viewport. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          !element.closest('[data-motion="paused"]')
        ) {
          element.animate(
            [
              { opacity: 0.65, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
          );
        }
        observer.unobserve(element);
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.getAnimations().forEach((animation) => animation.cancel());
    };
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
