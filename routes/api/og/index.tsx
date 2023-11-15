import { Handlers } from "$fresh/server.ts";
import { ImageResponse } from "og";
import { site } from "../../../data/site.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
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
          {site.title}
        </div>
      ) as // deno-lint-ignore no-explicit-any
      any
    );
  },
};
