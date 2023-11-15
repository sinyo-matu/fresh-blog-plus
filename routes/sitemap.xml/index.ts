import { Handlers } from "$fresh/server.ts";
import { listPosts } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    const { host } = ctx.state;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
         <url>
          <loc>https://${host}/</loc>
          <lastmod>${formatYearMonthDate(new Date())}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      ${posts
        .map((post) => {
          return `<url>
          <loc>https://${host}/blog/${post.slug}</loc>
          <lastmod>${formatYearMonthDate(post.publishedAt)}</lastmod>
          <changefreq>${"monthly"}</changefreq>
          <priority>1</priority>
        </url>`;
        })
        .join("\n")}
    </urlset>
    
    `;
    return new Response(sitemap, {
      headers: {
        "content-type": "application/xml",
      },
    });
  },
};
function formatYearMonthDate(date: Date) {
  return `${date.getFullYear()}-${("00" + (date.getMonth() + 1)).slice(-2)}-${(
    "00" + date.getDate()
  ).slice(-2)}`;
}
