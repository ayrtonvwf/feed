import { useIsSubmitting } from "remix-validated-form";

type MySubmitButtonProps = {
  name?: string;
  value?: string;
  children?:
    | React.ReactNode
    | ((props: { isSubmitting: boolean }) => React.ReactNode);
};

export const MySubmitButton: React.FC<MySubmitButtonProps> = ({
  name,
  value,
  children,
}) => {
  /**
   * @see https://www.remix-validated-form.io/integrate-your-components
   */

  const isSubmitting = useIsSubmitting();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
      name={name}
      value={value}
    >
      {children
        ? typeof children === "function"
          ? children({ isSubmitting })
          : children
        : isSubmitting
        ? "Submitting..."
        : "Submit"}
    </button>
  );
};
