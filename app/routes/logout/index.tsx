import {
  ActionFunction,
  DataFunctionArgs,
  LoaderArgs,
} from "@remix-run/cloudflare";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { Panel } from "~/components/block/panel";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyH1, MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";

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

const validator = withZod(z.object({}));

export default function Index() {
  return (
    <main className="container mx-auto">
      <MyH1>Sair</MyH1>
      <Panel className="max-w-lg mx-auto">
        <MyH2>Deseja fazer logout?</MyH2>
        <ValidatedForm method="post" validator={validator}>
          <MySubmitButton>
            {({ isSubmitting }) => (isSubmitting ? "Saindo..." : "Sair")}
          </MySubmitButton>
        </ValidatedForm>
      </Panel>
    </main>
  );
}
