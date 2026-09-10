import { useEffect, useRef, useState } from "react";
import type { ProjectPreview } from "@/content/projects";

/** Local screenshots and silent demos share a frame, with motion and loading controlled by visibility. */
export function ProjectMedia({
  media,
  paused = false,
  controls = false,
}: {
  media: ProjectPreview;
  paused?: boolean;
  controls?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const element = frame.current;
    if (!element || media.type === "image") return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      const active = visible && !paused && !motion.matches && !document.hidden;
      setAnimate(active);
      if (video.current) {
        if (!visible || document.hidden || (!controls && !active))
          video.current.pause();
        else if (active && !controls) void video.current.play().catch(() => {});
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.current?.pause();
    };
  }, [media, paused, controls]);

  return (
    <div className="project-media" ref={frame}>
      {media.type === "video" ? (
        <video
          ref={video}
          src={media.src}
          poster={media.poster}
          width={media.width}
          height={media.height}
          aria-label={media.alt}
          muted
          loop
          playsInline
          preload="none"
          controls={controls}
        />
      ) : (
        <img
          src={media.type === "gif" && !animate ? media.poster : media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
