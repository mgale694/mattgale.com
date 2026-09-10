import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/components/theme-provider";
import { Icon } from "./icon";

export function AppearanceToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [busy, setBusy] = useState(false);
  const transitionRef = useRef<ViewTransition | null>(null);

  useEffect(
    () => () => {
      transitionRef.current?.skipTransition();
      delete document.documentElement.dataset.appearanceDirection;
    },
    [],
  );

  const toggle = () => {
    if (busy) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    // Capture the current page, then reveal the updated theme from the requested edge.
    document.documentElement.dataset.appearanceDirection = `to-${next}`;
    setBusy(true);
    const reset = () => {
      transitionRef.current = null;
      delete document.documentElement.dataset.appearanceDirection;
      setBusy(false);
    };
    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });
      transitionRef.current = transition;
      // A hidden tab or interrupted transition can reject ready without failing the theme change.
      void transition.ready.catch(() => {});
      void transition.finished.catch(() => {}).finally(reset);
    } catch {
      setTheme(next);
      reset();
    }
  };

  return (
    <button
      className="icon-button contrast-toggle"
      aria-label={
        resolvedTheme === "dark"
          ? "Use light appearance"
          : "Use editorial appearance"
      }
      aria-pressed={resolvedTheme === "light"}
      disabled={busy}
      onClick={toggle}
    >
      <Icon name="contrast" />
    </button>
  );
}
