import { useState } from "react";
import { projects } from "@/content/projects";
import { researchUrl } from "@/content/site";
import { Section } from "./section";
import { Eyebrow } from "./typography";
import { ProjectExhibition } from "./project-exhibition";
import { ProjectRow } from "./project-row";
import { TextLink } from "./text-link";
import { Icon } from "./icon";

export function WorkSection({ paused = false }: { paused?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const featured = projects.filter((project) => project.featured);
  const other = projects.filter((project) => !project.featured);
  const writing = researchUrl();
  return (
    <Section id="work" className="work" aria-labelledby="work-title">
      <ProjectExhibition projects={featured} paused={paused} />
      <div className="more-projects" id="work-index" tabIndex={-1}>
        <button
          className="more-projects__toggle"
          aria-expanded={expanded}
          aria-controls="more-projects"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? "Fewer experiments" : "More experiments"}</span>
          <Eyebrow>{String(other.length).padStart(2, "0")} projects</Eyebrow>
          <Icon name={expanded ? "close" : "plus"} />
        </button>
        <div id="more-projects" hidden={!expanded}>
          {expanded &&
            other.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={featured.length + index}
              />
            ))}
        </div>
      </div>
      {writing && (
        <div className="writing-note">
          <div>
            <Eyebrow>Thinking out loud</Eyebrow>
            <p>Research, ideas and the work behind the work.</p>
          </div>
          <TextLink href={writing}>Read my writing at Atlas</TextLink>
        </div>
      )}
    </Section>
  );
}
