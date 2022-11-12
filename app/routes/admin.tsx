import { LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { redirect } from "remix-typedjson";
import { MyNavLink } from "~/components/header/link";
import { getAuth } from "~/services/auth.server";
import { makeSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderArgs) => {
  const sessionStorage = makeSession(context);
  const user = await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (user.type !== "SUPERADMIN") {
    return redirect("/");
  }

  return null;
};

export default function Index() {
  return (
    <div className="flex">
      <nav>
        <MyNavLink to="/admin/tenants">Tenants</MyNavLink>
        <MyNavLink to="/admin/users">Usuários</MyNavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
