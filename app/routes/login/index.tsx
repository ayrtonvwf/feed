import { ActionFunction, DataFunctionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Entrar</h1>
      <Form method="post">
        <input name="email" placeholder="E-mail" required minLength={5} type="email" />
        <input name="password" placeholder="Senha" required minLength={5} type="password" />
        <button type="submit">Log in</button>
      </Form>
    </div>
  );
}
