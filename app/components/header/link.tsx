import { NavLink, NavLinkProps } from "@remix-run/react";

export const MyNavLink: React.FC<NavLinkProps> = (props) => {
  return (
    <NavLink {...props} className={({isActive}) => `p-2 ${isActive ? 'font-bold' : null}`} />
  );
}