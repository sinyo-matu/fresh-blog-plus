import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts, Post } from "../utils/posts.ts";
import { State } from "../utils/state.ts";
import { Container } from "../components/Container.tsx";
import { HomeHeader } from "../components/HomeHeader.tsx";
import { PostPreview } from "../components/PostPreview.tsx";
import { Head } from "$fresh/runtime.ts";
import { site } from "../data/site.ts";

interface Data extends State {
  posts: Post[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render({ ...ctx.state, posts });
  },
};

export default function Home(props: PageProps<Data, State>) {
  const { posts } = props.data;
  const { host } = props.state;
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{site.title}</title>
        <meta name="title" content={site.title} />
        <meta name="description" content={site.description} />
        {/* Theme */}
        <meta name="theme-color" content="#000" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${host}/`} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content={`https://${host}/api/og`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={site.title} />
        <meta property="twitter:description" content={site.description} />
        <meta property="twitter:image" content={`https://${host}/api/og`} />
      </Head>
      <HomeHeader />
      <main>
        <Container>
          <ul class="mt-16">
            {posts.map((post) => (
              <PostPreview post={post} />
            ))}
          </ul>
        </Container>
      </main>
    </>
  );
}
