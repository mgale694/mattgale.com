import type { experience } from "@/content/site";
import { Eyebrow } from "./typography";
export function ExperienceRow({
  entry,
}: {
  entry: (typeof experience)[number];
}) {
  return (
    <div className="experience-row">
      <Eyebrow>{entry.period}</Eyebrow>
      <div>
        <h4>{entry.title}</h4>
        <p>{entry.description}</p>
        <ul>
          {entry.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
