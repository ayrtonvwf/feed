import { Session } from "@remix-run/cloudflare";

export const showToast = (session: Session, message: string) => {
  session.flash("toastMessage", message);
};
