import { Handlers } from "$fresh/server.ts";
import { site } from "../../data/site.ts";
import { listPosts } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    const { host } = ctx.state;
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <atom:link href="https://${host}/rss.xml" rel="self" type="application/rss+xml" />
            <title>${host}</title>
            <link>https://${host}/</link>
            <description>${site.description}</description>
            <language>en</language>
            ${posts
              .map((post) => {
                post.title = post.title.replace(/&/g, "&amp;");
                post.description = post.description?.replace(/&/g, "&amp;");
                return `
            <item>
                <guid>https://${host}/blog/${post.slug}</guid>
                <title>${post.title}</title>
                <link>https://${host}/blog/${post.slug}</link>
                <description>${post.description}</description>
                <pubDate>${formatRFC822Date(post.publishedAt)}</pubDate>
            </item>`;
              })
              .join("\n")}
        </channel>
    </rss>
        
        `;
    return new Response(rss, {
      headers: {
        "content-type": "application/xml",
      },
    });
  },
};

function formatRFC822Date(date: Date) {
  return `${date.toUTCString()}`;
}
