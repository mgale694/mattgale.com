import { useEffect, useRef } from "react";
import { Eyebrow } from "./typography";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "./project-media";

/** Mathematical cover studies, not screenshots or measured financial data. */
function ContourStudy({ variant }: { variant: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current,
      context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isAtlas = variant === "atlas",
        isTrading = variant === "trading",
        isFlight = variant === "flight";
      const count = isFlight ? 16 : 44;
      for (let i = 0; i < count; i++) {
        const n = i / (count - 1);
        context.beginPath();
        for (let j = 0; j <= 180; j++) {
          const x = j / 180;
          let y: number;
          if (isAtlas) y = 0.35 + Math.sin(x * 4.5 + n * 2.4) * 0.18 + n * 0.48;
          else if (isTrading)
            y =
              0.2 +
              n * 0.64 +
              Math.sin(x * 8 + n * 3) * Math.sin(x * Math.PI) * 0.22;
          else if (isFlight)
            y = 0.82 - Math.sin(x * Math.PI) * (0.25 + n * 0.6);
          else y = 0.38 + Math.sin(x * 4.3 + n * 1.6) * 0.23 + n * 0.36;
          if (j === 0) context.moveTo(x * width, y * height);
          else context.lineTo(x * width, y * height);
        }
        context.strokeStyle = isAtlas
          ? "#11110f"
          : i === 21 || (isFlight && i === 8)
            ? "#f0443a"
            : isTrading
              ? "#f3eee7"
              : "#11110f";
        context.globalAlpha = isAtlas ? 0.5 : 0.2 + n * 0.35;
        context.lineWidth = isFlight ? 0.8 : 0.65;
        context.stroke();
      }
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [variant]);
  return <canvas ref={ref} className="contour-study" aria-hidden="true" />;
}

export function ProjectArtwork({
  project,
  paused = false,
}: {
  project: Project;
  paused?: boolean;
}) {
  const projectId = project.id;
  if (project.preview)
    return (
      <div
        className={`project-artwork project-artwork--preview project-artwork--preview-${projectId}`}
      >
        <ProjectMedia media={project.preview} paused={paused} />
      </div>
    );
  if (projectId === "photography")
    return (
      <div className="project-artwork project-artwork--photography">
        <img
          className="photograph photograph--landscape"
          src="/showcase/tokyo-temple.webp"
          alt="A busy temple courtyard in Tokyo, photographed on film"
          width="1545"
          height="1024"
          loading="lazy"
          decoding="async"
        />
        <img
          className="photograph photograph--portrait"
          src="/showcase/tokyo-pagoda.webp"
          alt="A Tokyo pagoda against a clear blue sky, photographed on film"
          width="1024"
          height="1545"
          loading="lazy"
          decoding="async"
        />
      </div>
    );

  return (
    <div
      className={`project-artwork project-artwork--${projectId}`}
      aria-hidden="true"
    >
      {projectId !== "uvve" && <ContourStudy variant={projectId} />}
      {projectId === "atlas" && (
        <>
          <Eyebrow className="artwork-top">Independent market research</Eyebrow>
          <span className="artwork-type artwork-type--atlas">
            ATLAS
            <br />
            <span>SIGNALS</span>
          </span>
          <span className="artwork-foot">Patterns. Context. Perspective.</span>
        </>
      )}
      {projectId === "trading" && (
        <>
          <Eyebrow className="artwork-top">Market execution research</Eyebrow>
          <span className="artwork-type artwork-type--trade">
            BUY.
            <br />
            <span>SELL.</span>
            <br />
            REPEAT.
          </span>
          <span className="artwork-foot">Python trading engine</span>
        </>
      )}
      {projectId === "flight" && (
        <>
          <Eyebrow className="artwork-top">Live aviation data</Eyebrow>
          <span className="artwork-type artwork-type--flight">
            LOOK
            <br />
            UP<span className="signal-text">↗</span>
          </span>
          <span className="artwork-foot">Flight tracker</span>
        </>
      )}
      {projectId === "uvve" && (
        <>
          <Eyebrow className="artwork-top">Less friction. More Python.</Eyebrow>
          <span className="artwork-type artwork-type--uvve">
            <span>u</span>
            <span>v</span>
            <span>v</span>
            <span>e</span>
          </span>
          <span className="artwork-foot">Small tools, better workflows.</span>
        </>
      )}
    </div>
  );
}
