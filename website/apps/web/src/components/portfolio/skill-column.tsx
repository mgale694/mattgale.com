import { Eyebrow } from "./typography";
export function SkillColumn({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="skill-column">
      <h3>
        <Eyebrow>
          {title}
        </Eyebrow>
        <span className="signal-line" aria-hidden="true" />
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
