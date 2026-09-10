// Build-time only. No browser glob imports or application runtime needed.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { site } from "../content/site";

const appRoot = fileURLToPath(new URL("../../", import.meta.url));
const contentRoot = path.join(appRoot, "src/content/blog");
const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );

function markdownFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory()
      ? markdownFiles(filename)
      : entry.name.endsWith(".md")
        ? [filename]
        : [];
  });
}

export function generateSitemap() {
  const urls = [site.url + "/"];
  if (site.blog.enabled) {
    urls.push(site.url + "/blog");
    for (const filename of markdownFiles(contentRoot)) {
      // The existing blog router uses the markdown basename as its ID.
      const id = path.basename(filename, ".md");
      const { data } = matter(fs.readFileSync(filename, "utf8"));
      if (data.title) urls.push(site.url + "/blog/" + encodeURIComponent(id));
    }
  }
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [...new Set(urls)]
      .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
      .join("\n") +
    "\n</urlset>\n";
  fs.writeFileSync(path.join(appRoot, "public/sitemap.xml"), xml);
  console.log(`Sitemap generated for ${urls.length} public page(s).`);
}
generateSitemap();
