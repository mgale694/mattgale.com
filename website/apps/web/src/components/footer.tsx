import { site } from "@/content/site";
import { Wordmark } from "./portfolio/wordmark";
import { Eyebrow } from "./portfolio/typography";
import { TextLink } from "./portfolio/text-link";

export default function Footer() {
  return (
    <footer className="site-footer tone-paper">
      <Wordmark />
      <Eyebrow>
        © {new Date().getFullYear()} {site.name}
      </Eyebrow>
      <Eyebrow className="site-footer__role">Markets. Models. Systems.</Eyebrow>
      <TextLink href="/#home" icon="arrowUp">
        Back to top
      </TextLink>
    </footer>
  );
}
