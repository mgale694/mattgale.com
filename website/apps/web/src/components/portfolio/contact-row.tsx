import { Icon } from "./icon";

export function ContactRow({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value?: string;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      className="contact-row"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="contact-row__label">{label}</span>
      {value && <span className="contact-row__value">{value}</span>}
      <Icon name="external" size={26} />
    </a>
  );
}
