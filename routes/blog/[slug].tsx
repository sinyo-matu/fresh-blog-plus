import { Handlers, PageProps } from "$fresh/server.ts";
import * as gfm from "$gfm";
import { Container } from "../../components/Container.tsx";
import { loadPost, Post } from "../../utils/posts.ts";
import { Header } from "../../components/Header.tsx";
import { ServerCodePage } from "../_404.tsx";
import { Head } from "$fresh/runtime.ts";
import { State } from "../../utils/state.ts";

interface Data {
  post: Post | null;
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const post = await loadPost(ctx.params.slug);
    return ctx.render({ ...ctx.state, post });
  },
};

export default function PostPage(props: PageProps<Data, State>) {
  const { post } = props.data;
  const { host } = props.state;
  if (!post) {
    return (
      <ServerCodePage
        serverCode={404}
        codeDescription={"We couldn't find the post you're looking for."}
      />
    );
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags} />
        {/* Theme */}
        <meta name="theme-color" content="#000" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${host}/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta
          property="og:image"
          content={`https://${host}/api/og/blog/${post.slug}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta
          property="twitter:image"
          content={`https://${host}/api/og/blog/${post.slug}`}
        />
        <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
      </Head>
      <Header />
      <Container>
        <h1 class="font-bold text-5xl pt-20">{post.title}</h1>
        <time class="inline-block mt-4">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
        <article
          class="mt-12 markdown-body"
          dangerouslySetInnerHTML={{ __html: gfm.render(post.content) }}
        />
      </Container>
    </>
  );
}
