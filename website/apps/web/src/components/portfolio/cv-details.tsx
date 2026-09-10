import { useEffect, useRef } from "react";
import { certifications, experience, site } from "@/content/site";
import { ExperienceRow } from "./experience-row";
import { Icon } from "./icon";
import { Eyebrow } from "./typography";

export function CvDetails() {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    let wasOpen = false;
    const before = () => {
      if (ref.current) {
        wasOpen = ref.current.open;
        ref.current.open = true;
      }
    };
    const after = () => {
      if (ref.current) ref.current.open = wasOpen;
    };
    const revealHash = () => {
      if (window.location.hash === "#cv" && ref.current)
        ref.current.open = true;
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("hashchange", revealHash);
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);
  return (
    <details className="cv-details" id="cv" ref={ref}>
      <summary>
        <span>
          <Eyebrow>A little more background</Eyebrow>
          <span className="cv-details__label">Experience & CV</span>
        </span>
        <Icon name="plus" className="disclosure-icon" size={28} />
      </summary>
      <div className="cv-details__content">
        <div className="cv-print-heading">
          <h2>{site.name}</h2>
          <p>
            {site.title} · {site.location}
          </p>
          <p>
            {site.email} · {site.url}
          </p>
        </div>
        <div className="cv-details__intro">
          <h3>Professional experience</h3>
          <button className="text-link" onClick={() => window.print()}>
            Print / save CV
            <Icon name="print" size={18} />
          </button>
        </div>
        {experience.map((entry) => (
          <ExperienceRow key={entry.title} entry={entry} />
        ))}
        <div className="experience-row">
          <Eyebrow>Certifications</Eyebrow>
          <div className="cv-details__certifications">
            {certifications.map((credential) => (
              <div key={credential.title}>
                <h3>{credential.title}</h3>
                <p>{credential.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}
