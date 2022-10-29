export const Panel: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => (
  <div
    {...props}
    className={
      "my-5 flex flex-col gap-2 bg-white p-5 shadow " + props.className
    }
  >
    {props.children}
  </div>
);
