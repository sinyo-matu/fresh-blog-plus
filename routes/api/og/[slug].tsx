import { Handlers } from "$fresh/server.ts";
import { ImageResponse } from "og";
import { loadPost } from "../../../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;
    const post = await loadPost(slug);
    if (!post) {
      return ctx.render({ status: 404 });
    }
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 128,
            background: "lavender",
          }}
        >
          {post!.title}
        </div> // deno-lint-ignore no-explicit-any
      ) as any
    );
  },
};
