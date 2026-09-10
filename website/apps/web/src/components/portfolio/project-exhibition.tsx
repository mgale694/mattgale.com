import { useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import type { Project } from "@/content/projects";
import { DisplayHeading, Eyebrow } from "./typography";
import { SectionLabel } from "./section";
import { ProjectExhibit } from "./project-exhibit";
import { ProjectDialog } from "./project-dialog";

/** Native vertical scrolling supplies the full horizontal travel; no wheel interception. */
export function ProjectExhibition({
  projects,
  paused = false,
}: {
  projects: Project[];
  paused?: boolean;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const container = rail.current,
      viewport = stage.current,
      sequence = track.current;
    if (!container || !viewport || !sequence) return;
    const media = matchMedia(
      "(prefers-reduced-motion: no-preference) and (min-height: 600px)",
    );
    let frame = 0;
    const measure = () => {
      const enabled =
        !paused &&
        media.matches &&
        CSS.supports("animation-timeline", "view()");
      container.dataset.staged = String(enabled);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const travel = Math.max(0, sequence.scrollWidth - viewport.clientWidth);
        container.style.setProperty("--exhibition-travel", `${travel}px`);
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(sequence);
    media.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, [paused]);

  const bringIntoView = (event: FocusEvent<HTMLDivElement>) => {
    if (rail.current?.dataset.staged !== "true") return;
    if (!(event.target as HTMLElement).matches(":focus-visible")) return;
    const exhibit = (event.target as HTMLElement).closest<HTMLElement>(
      ".project-exhibit",
    );
    if (!exhibit || !stage.current || !track.current) return;
    const bounds = exhibit.getBoundingClientRect(),
      viewport = stage.current.getBoundingClientRect();
    // Keyboard traversal follows the exhibition's reading order as well as its visual order.
    if (bounds.left < viewport.left || bounds.right > viewport.right) {
      const travel = parseFloat(
        rail.current.style.getPropertyValue("--exhibition-travel"),
      );
      const inset = parseFloat(getComputedStyle(stage.current).top);
      const position = Math.min(
        travel,
        Math.max(
          0,
          exhibit.offsetLeft - (viewport.width - exhibit.offsetWidth) / 2,
        ),
      );
      window.scrollTo({
        top:
          window.scrollY +
          rail.current.getBoundingClientRect().top -
          inset +
          position,
        behavior: "instant",
      });
    }
  };

  return (
    <>
      <div ref={rail} className="project-exhibition" data-staged="false">
        <div ref={stage} className="project-exhibition__stage">
          <div className="project-exhibition__header">
            <SectionLabel number="03" note="Projects & experiments">
              Work
            </SectionLabel>
            <a href="#work-index" className="exhibition-skip">
              Skip showcase
            </a>
          </div>
          <div className="project-exhibition__window">
            <span className="project-exhibition__backdrop" aria-hidden="true">
              SELECTED WORK
            </span>
            <div
              ref={track}
              className="project-exhibition__track"
              onFocusCapture={bringIntoView}
            >
              <div className="project-exhibition__intro">
                <Eyebrow>
                  Built with purpose.
                  <br />
                  Led by curiosity.
                </Eyebrow>
                <DisplayHeading id="work-title">
                  Selected
                  <br />
                  work<span className="signal-text">.</span>
                </DisplayHeading>
                <p>
                  Some built for the day job.
                  <br />
                  Others for the questions
                  <br />
                  that won’t leave me alone.
                </p>
              </div>
              {projects.map((project, index) => (
                <ProjectExhibit
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setSelected}
                  paused={paused || !!selected}
                />
              ))}
            </div>
          </div>
          <div className="project-exhibition__footer">
            <Eyebrow className="exhibition-scroll-note">
              Keep scrolling to explore
            </Eyebrow>
            <span className="project-exhibition__rule" />
            <Eyebrow>
              {String(projects.length).padStart(2, "0")} selected projects
            </Eyebrow>
          </div>
        </div>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
