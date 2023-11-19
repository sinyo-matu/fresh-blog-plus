import { Container } from "./Container.tsx";
import { site } from "../data/site.ts";
export function Footer() {
  return (
    <footer class="w-full pt-10 pb-4">
      <Container>
        <div class="text-center">
          <span>
            &copy; {new Date().getFullYear()} {site.copyrightName} •{" "}
          </span>
          <span class="inline-flex items-center gap-1 underline">
            <a
              href="/rss.xml"
              class="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              RSS
            </a>
            {site.githubUrl ? (
              <a
                class="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                href={site.githubUrl}
              >
                Github
              </a>
            ) : null}
          </span>
        </div>
      </Container>
    </footer>
  );
}
