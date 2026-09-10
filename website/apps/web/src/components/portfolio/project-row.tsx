import { useState } from "react";
import { researchUrl } from "@/content/site";
import type { Project } from "@/content/projects";
import { Eyebrow } from "./typography";
import { Icon } from "./icon";
import { TextLink } from "./text-link";

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const article = project.articleSlug
    ? researchUrl(project.articleSlug)
    : undefined;
  return (
    <details
      className="project-row"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <Eyebrow className="project-row__number">
          {String(index + 1).padStart(2, "0")}
        </Eyebrow>
        <span className="project-row__body">
          <span className="project-row__title">{project.title}</span>
          <span className="project-row__description">
            {project.description}
          </span>
          <span className="project-row__tags">
            {project.technologies.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </span>
        <Eyebrow
          className={`project-row__status ${project.status === "Private" ? "is-muted" : ""}`}
        >
          {project.status}
        </Eyebrow>
        <Icon name="plus" className="disclosure-icon" size={24} />
      </summary>
      {open && (
        <div className="project-row__details">
          <div>
            <Eyebrow>Inside the project</Eyebrow>
            <p>{project.details}</p>
          </div>
          <div className="project-row__links">
            {project.liveUrl && (
              <TextLink href={project.liveUrl}>Visit project</TextLink>
            )}
            {article && <TextLink href={article}>Read the research</TextLink>}
            {project.githubUrl && (
              <TextLink href={project.githubUrl}>View source</TextLink>
            )}
            {!project.liveUrl && !article && !project.githubUrl && (
              <p className="project-row__private">
                {project.status === "Private"
                  ? "Professional work. Code and client details remain private."
                  : "An archived learning project."}
              </p>
            )}
          </div>
        </div>
      )}
    </details>
  );
}
