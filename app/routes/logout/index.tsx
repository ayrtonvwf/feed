import {
  ActionFunction,
  DataFunctionArgs,
  LoaderArgs,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: "/login" });
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
