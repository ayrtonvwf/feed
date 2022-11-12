import {
  ActionFunction,
  DataFunctionArgs,
  LoaderArgs,
} from "@remix-run/cloudflare";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Panel } from "~/components/block/panel";
import { MyInput } from "~/components/form/input";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";

export const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(1, { message: "Password is required" }),
  })
);

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const result = await validator.validate(await request.clone().formData());

  if (result.error) {
    // validationError comes from `remix-validated-form`
    return validationError(result.error, result.data);
  }

  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export default function Index() {
  return (
    <main className="container mx-auto">
      <MyH1>
        Faça aqui o seu login com o seu e-mail e a sua senha que você informou
        na hora da criação da sua nova conta nesse maravilhoso sistema de feed
      </MyH1>
      <Panel>
        <ValidatedForm validator={validator} method="post">
          <fieldset className="flex flex-col gap-2">
            <MyInput name="email" label="Email" />
            <MyInput name="password" label="Password" type="password" />
            <MySubmitButton />
          </fieldset>
        </ValidatedForm>
        <h2>Esqueceu o seu e-mail ou a sua senha?</h2>
        <span className="text-sm">problema seu</span>
      </Panel>
    </main>
  );
}
