import { Section, Divider } from "./section";
import { DisplayHeading, Eyebrow, SignalDot } from "./typography";
import { MarketField } from "./market-field";
import { Icon } from "./icon";
import { TextLink } from "./text-link";
import { RollingText } from "./rolling-text";

export function HeroSection({
  paused,
  onToggleMotion,
}: {
  paused: boolean;
  onToggleMotion: () => void;
}) {
  return (
    <Section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__canvas">
        <MarketField paused={paused} />
      </div>
      <div className="hero__topline">
        <Eyebrow>01 / Introduction</Eyebrow>
        <Eyebrow className="hero__edition">
          Independent thinking.
          <br />
          Practical outcomes.
        </Eyebrow>
      </div>
      <div className="hero__field-label">
        <span className="signal-line" />
        <Eyebrow>
          Rates & credit
          <br />
          Risk & opportunity
        </Eyebrow>
      </div>
      <div className="hero__title-block">
        <Eyebrow className="hero__eyebrow">
          <SignalDot /> Finance, technology & curiosity
        </Eyebrow>
        <DisplayHeading as="h1" id="hero-title" className="hero__name">
          <RollingText text="Matthew Gale" paused={paused} />
          <span className="signal-text">.</span>
        </DisplayHeading>
        <div className="hero__baseline">
          <p className="hero__role">Quantitative developer</p>
          <p className="hero__description">
            Turning quantitative ideas into
            <br />
            software that works in the real world.
          </p>
        </div>
      </div>
      <div className="hero__bottom">
        <TextLink href="#about" icon="arrowDown">
          Explore the work & the person
        </TextLink>
        <Eyebrow>Based in London, UK</Eyebrow>
        <button
          className="motion-toggle"
          onClick={onToggleMotion}
          aria-pressed={paused}
        >
          <Icon name={paused ? "play" : "pause"} size={14} />
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
      <Divider label="Probabilistic thinking" end="Practical solutions" />
    </Section>
  );
}
