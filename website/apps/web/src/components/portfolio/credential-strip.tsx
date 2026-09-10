import { Eyebrow } from "./typography";

type Credential = {
  title: string;
  detail: string;
};

export function CredentialStrip({
  items,
}: {
  items: readonly Credential[];
}) {
  return (
    <div className="credential-strip" aria-label="Certifications">
      <Eyebrow>Certifications</Eyebrow>
      <ul>
        {items.map((item) => (
          <li key={`${item.title}-${item.detail}`}>
            <span>{item.title}</span>
            <Eyebrow>{item.detail}</Eyebrow>
          </li>
        ))}
      </ul>
    </div>
  );
}
