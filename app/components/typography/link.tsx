import { Link, LinkProps } from "@remix-run/react";

export const MyLink: React.FC<LinkProps> = (props) => (
  <Link {...props} className={`text-sky-500 ${props.className}`}>
    {props.children}
  </Link>
);
