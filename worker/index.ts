import { createFetch } from "remix-cloudflare-workers-fetch";
import * as build from "../build";
//@ts-ignore
import assetJson from "__STATIC_CONTENT_MANIFEST";
import type { ServerBuild } from "remix-cloudflare-workers-fetch";
import { Counter } from "./counter";

const fetch = createFetch({
  build: build as unknown as ServerBuild,
  assetJson,
  mode: "production",
  options: {
    cacheControl: {
      bypassCache: true,
    },
  },
});

export default {
  fetch,
};

export { Counter };
