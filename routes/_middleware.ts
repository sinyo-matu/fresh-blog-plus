import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { State } from "../utils/state.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const host = req.headers.get("host");
  if (!host) {
    return new Response("missing host header", { status: 400 });
  }
  ctx.state.host = host;
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
