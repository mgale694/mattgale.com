import { useEffect, useState } from "react";
import { AppearanceToggle } from "./portfolio/appearance-toggle";
import { useRouterState } from "@tanstack/react-router";
import { navigation, site } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { Icon } from "./portfolio/icon";
import { Wordmark } from "./portfolio/wordmark";
import { Eyebrow } from "./portfolio/typography";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { id, tone } = useActiveSection();
  const location = useRouterState({ select: (state) => state.location.href });
  useEffect(() => setOpen(false), [location]);
  return (
    <header
      className={`site-header tone-${tone}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          document.getElementById("menu-toggle")?.focus();
        }
      }}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-header__inner">
        <Wordmark />
        <Eyebrow className="site-header__intro">
          Markets
          <br />
          Models
          <br />
          Systems
        </Eyebrow>
        <nav
          className={`site-nav ${open ? "is-open" : ""}`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              aria-current={id === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {site.blog.enabled && (
            <a href="/blog" onClick={() => setOpen(false)}>
              Blog
            </a>
          )}
        </nav>
        <div className="site-header__socials">
          <a
            className="icon-button"
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Matthew Gale on GitHub"
          >
            <Icon name="github" />
          </a>
          <a
            className="icon-button"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Matthew Gale on LinkedIn"
          >
            <Icon name="linkedin" />
          </a>
        </div>
        <AppearanceToggle />
        <Eyebrow className="site-header__location">
          Quantitative developer
          <br />
          London, UK
        </Eyebrow>
        <button
          id="menu-toggle"
          className="icon-button menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
