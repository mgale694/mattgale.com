import { Fragment, useEffect, useRef } from "react";

/** Keeps one readable name while individual decorative glyphs roll through their masks. */
export function RollingText({
  text,
  paused = false,
}: {
  text: string;
  paused?: boolean;
}) {
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const letters = [
      ...element.querySelectorAll<HTMLElement>(".rolling-text__letter"),
    ];
    let visible = false,
      disposed = false,
      timer: ReturnType<typeof setTimeout>;
    let previous = -1;
    const animations = new Set<Animation>();
    const stop = () => {
      clearTimeout(timer);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const schedule = () => {
      if (disposed || paused || motion.matches || document.hidden || !visible)
        return;
      timer = setTimeout(
        () => {
          let index = Math.floor(Math.random() * letters.length);
          if (index === previous) index = (index + 1) % letters.length;
          previous = index;
          const axis = Math.random() > 0.5 ? "X" : "Y";
          const direction = Math.random() > 0.5 ? 100 : -100;
          const [glyph, replacement] = letters[index].children;
          const timing = {
            duration: 880,
            easing: "cubic-bezier(.65, 0, .25, 1)",
          };
          const outgoing = glyph.animate(
            [
              { transform: `translate${axis}(0)` },
              { transform: `translate${axis}(${direction}%)` },
            ],
            timing,
          );
          const incoming = replacement.animate(
            [
              {
                transform: `translate${axis}(${-direction}%)`,
                visibility: "visible",
              },
              { transform: `translate${axis}(0)`, visibility: "visible" },
            ],
            timing,
          );
          for (const animation of [outgoing, incoming]) {
            animations.add(animation);
            void animation.finished.then(
              () => animations.delete(animation),
              () => {},
            );
          }
          schedule();
        },
        950 + Math.random() * 1750,
      );
    };
    const sync = () => {
      stop();
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [text, paused]);

  return (
    <span ref={root} className="rolling-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            {index > 0 && " "}
            <span className="rolling-text__word">
              {[...word].map((letter, i) => (
                <span className="rolling-text__letter" key={i}>
                  <span className="rolling-text__glyph">{letter}</span>
                  <span className="rolling-text__replacement">{letter}</span>
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
