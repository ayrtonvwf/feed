import { relative } from "~/helpers/date";
export const DateTime = ({ children }: { children: Date }) => (
  <time dateTime={children.toISOString()} title={children.toString()}>
    {relative(children)}
  </time>
);
