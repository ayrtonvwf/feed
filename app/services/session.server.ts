import { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";

export const makeSession = (context: AppLoadContext) => {
  return context.sessionStorage as SessionStorage;
};
