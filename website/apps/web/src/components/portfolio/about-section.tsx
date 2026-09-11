import { certifications, site, skills } from "@/content/site";
import { Section, SectionLabel, Divider } from "./section";
import { Eyebrow } from "./typography";
import { ScrollHeading } from "./scroll-heading";
import { MarketField } from "./market-field";
import { SkillColumn } from "./skill-column";
import { CvDetails } from "./cv-details";
import { Reveal } from "./reveal";
import { TextLink } from "./text-link";
import { CredentialStrip } from "./credential-strip";

export function AboutSection({ paused }: { paused: boolean }) {
  return (
    <Section
      id="about"
      tone="paper"
      className="about"
      aria-labelledby="about-title"
    >
      <SectionLabel number="02" note="A bit about me">
        About
      </SectionLabel>
      <div className="about__intro">
        <div className="about__copy">
          <ScrollHeading
            id="about-title"
            lines={[
              "I write production",
              "software for",
              <>
                financial problems<span className="signal-text">.</span>
              </>,
            ]}
          />
          <p className="body-large">
            I’m a quantitative developer working across financial models, risk
            systems and data. I sit between modelling and software engineering,
            turning quantitative ideas into robust, maintainable systems that
            perform in production.
          </p>
        </div>
        <div className="about__visual">
          <MarketField variant="about" paused={paused} />
          <div className="about__visual-caption">
            <Eyebrow>
              Same problems.
              <br />
              Different perspectives.
            </Eyebrow>
            <span className="signal-line" />
          </div>
        </div>
      </div>
      <Reveal className="about__details">
        <div className="skill-columns">
          {skills.map((skill, i) => (
            <SkillColumn key={skill.title} number={`0${i + 1}`} {...skill} />
          ))}
        </div>
        <div className="about__aside">
          <p>
            Mathematics by background.
            <br />Problem solver by instinct.
          </p>
          <TextLink href={site.photography}>
            Away from the screen, I shoot film
          </TextLink>
        </div>
      </Reveal>
      <Reveal>
        <CredentialStrip items={certifications} />
      </Reveal>
      <CvDetails />
      <Divider label="Build reliable systems" end="Models / Data / Software" />
    </Section>
  );
}
