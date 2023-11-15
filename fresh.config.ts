import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

export const config = defineConfig({ plugins: [twindPlugin(twindConfig)] });
