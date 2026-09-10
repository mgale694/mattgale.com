import { useEffect, useRef } from "react";
import type { Project } from "@/content/projects";
import { researchUrl } from "@/content/site";
import { DisplayHeading, Eyebrow } from "./typography";
import { Icon } from "./icon";
import { TextLink } from "./text-link";
import { ProjectMedia } from "./project-media";

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !project) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [project]);
  const article = project?.articleSlug
    ? researchUrl(project.articleSlug)
    : undefined;
  return (
    <dialog
      ref={ref}
      className="project-dialog tone-ink"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      {project && (
        <div className="project-dialog__content">
          <div className="project-dialog__top">
            <Eyebrow>{project.status}</Eyebrow>
            <button
              className="icon-button"
              autoFocus
              aria-label="Close project"
              onClick={() => ref.current?.close()}
            >
              <Icon name="close" />
            </button>
          </div>
          <DisplayHeading id="project-dialog-title">
            {project.title}
            <span className="signal-text">.</span>
          </DisplayHeading>
          {project.preview && <ProjectMedia media={project.preview} controls />}
          <p className="body-large">{project.details}</p>
          <p className="project-dialog__technologies">
            {project.technologies.join(" / ")}
          </p>
          <div className="project-dialog__links">
            {article && <TextLink href={article}>Read the research</TextLink>}
            {project.liveUrl && !article && (
              <TextLink href={project.liveUrl}>Visit the site</TextLink>
            )}
            {project.githubUrl && (
              <TextLink href={project.githubUrl} icon="github">
                View source
              </TextLink>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <p className="muted-text">
                {project.status === "Private"
                  ? "Professional work; source code and client details remain private."
                  : "A project from the archive."}
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
