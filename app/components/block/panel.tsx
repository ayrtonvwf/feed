export const Panel: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => (
  <div {...props} className={"bg-white my-5 p-5 shadow gap-2 flex flex-col " + props.className}>
    {props.children}
  </div>
);
