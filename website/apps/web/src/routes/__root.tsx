import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TextLink } from "@/components/portfolio/text-link";
import { site } from "@/content/site";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import "../index.css";

export interface RouterAppContext {}
export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Matthew Gale | Quantitative Developer" },
      { name: "description", content: site.description },
      {
        property: "og:title",
        content: "Matthew Gale | Quantitative Developer",
      },
      { property: "og:description", content: site.description },
      { property: "og:url", content: site.url + "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: site.url + "/" }],
  }),
  notFoundComponent: () => (
    <div className="route-message">
      <span className="eyebrow">404 / A small detour</span>
      <h1 className="display-heading">Nothing here.</h1>
      <TextLink href="/#work" icon="arrowRight">
        Back to selected work
      </TextLink>
    </div>
  ),
  errorComponent: () => (
    <div className="route-message">
      <h1 className="display-heading">Something went wrong.</h1>
      <p>Please reload the page or return to the portfolio.</p>
      <TextLink href="/" icon="arrowRight">
        Return home
      </TextLink>
    </div>
  ),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="mg-portfolio-appearance"
      >
        <div className="site-shell">
          <Header />
          <main id="main" tabIndex={-1}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
