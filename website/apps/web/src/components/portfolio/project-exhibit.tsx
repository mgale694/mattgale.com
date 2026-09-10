import type { Project } from "@/content/projects";
import { ProjectArtwork } from "./project-artwork";
import { Icon } from "./icon";
import { Eyebrow } from "./typography";

export function ProjectExhibit({
  project,
  index,
  onOpen,
  paused = false,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  paused?: boolean;
}) {
  return (
    <article
      className={`project-exhibit project-exhibit--${project.id}`}
      data-project-id={project.id}
      aria-labelledby={`exhibit-${project.id}`}
    >
      <button
        className="project-exhibit__open"
        onClick={() => onOpen(project)}
        aria-label={`Explore ${project.title}`}
      >
        <ProjectArtwork project={project} paused={paused} />
        <span className="project-exhibit__action">
          <Icon name="plus" size={24} />
        </span>
      </button>
      <div className="project-exhibit__caption">
        <Eyebrow>
          {String(index + 1).padStart(2, "0")} / {project.status}
        </Eyebrow>
        <h3 id={`exhibit-${project.id}`}>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}
