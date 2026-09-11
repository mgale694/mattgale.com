import { site } from "@/content/site";
import { Section, SectionLabel, Divider } from "./section";
import { Eyebrow } from "./typography";
import { ScrollHeading } from "./scroll-heading";
import { ContactRow } from "./contact-row";
import { CopyEmail } from "./copy-email";
import { MarketField } from "./market-field";
import { Reveal } from "./reveal";

export function ContactSection({ paused }: { paused: boolean }) {
  return (
    <Section
      id="contact"
      tone="paper"
      className="contact"
      aria-labelledby="contact-title"
    >
      <SectionLabel number="04" note="Finance / Engineering / Systems">
        Contact
      </SectionLabel>
      <div className="contact__grid">
        <div className="contact__intro">
          <ScrollHeading
            id="contact-title"
            lines={[
              "Say",
              <>
                hello<span className="signal-text">.</span>
              </>,
            ]}
          />
          <span className="signal-line" />
          <p className="body-large">
            I’m open to conversations about quantitative development,
            financial modelling, risk systems and software engineering.
          </p>
        </div>
        <div className="contact__visual">
          <MarketField variant="contact" paused={paused} />
        </div>
        <Reveal className="contact__links">
          <Eyebrow>Get in touch</Eyebrow>
          <div className="contact__rows">
            <ContactRow
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactRow label="LinkedIn" href={site.linkedin} />
            <ContactRow label="GitHub" href={site.github} />
            <ContactRow label="Photography" href={site.photography} />
          </div>
          <CopyEmail email={site.email} />
          <div className="contact__location">
            <Eyebrow>
              London, UK
            </Eyebrow>
            <p>
              Build robust
              <br />
              systems for production.
            </p>
          </div>
        </Reveal>
      </div>
      <Divider
        label="Markets / Models / Software"
        end="Quantitative development"
      />
    </Section>
  );
}
