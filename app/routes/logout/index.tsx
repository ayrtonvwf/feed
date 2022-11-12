import {
  ActionFunction,
  DataFunctionArgs,
  LoaderArgs,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { MyH1 } from "~/components/typography/title";
import { getAuth } from "~/services/auth.server";
import { makeSession } from "~/services/session.server";

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request, context }: LoaderArgs) {
  const sessionStorage = makeSession(context);
  // If the user is already authenticated redirect to /dashboard directly
  return await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/",
  });
}

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const sessionStorage = makeSession(context);
  await getAuth(sessionStorage).logout(request, { redirectTo: "/login" });
};

export default function Index() {
  return (
    <main className="container mx-auto">
      <MyH1>Sair</MyH1>
      <Form method="post">
        <button type="submit">Fazer logout</button>
      </Form>
    </main>
  );
}
