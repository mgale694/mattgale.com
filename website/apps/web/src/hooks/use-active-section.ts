import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function useActiveSection() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  const [active, setActive] = useState({ id: "home", tone: "ink" });
  useEffect(() => {
    if (pathname !== "/") {
      setActive({ id: "", tone: "ink" });
      return;
    }
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive({
              id: entry.target.id,
              tone: (entry.target as HTMLElement).dataset.tone ?? "ink",
            });
        }
      },
      { rootMargin: "-16% 0px -78% 0px", threshold: 0 },
    );
    // The route is lazy-loaded, so the shell can mount before its sections exist.
    const observed = new Set<Element>();
    const connect = () => {
      document
        .querySelectorAll("[data-portfolio-section]")
        .forEach((section) => {
          if (!observed.has(section)) {
            observer.observe(section);
            observed.add(section);
          }
        });
    };
    const contentObserver = new MutationObserver(connect);
    const main = document.getElementById("main");
    if (main) contentObserver.observe(main, { childList: true, subtree: true });
    connect();
    return () => {
      observer.disconnect();
      contentObserver.disconnect();
    };
  }, [pathname, isLoading]);
  return active;
}
