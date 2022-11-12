import { useIsSubmitting } from "remix-validated-form";

type MySubmitButtonProps = {
  name?: string;
  value?: string;
};

export const MySubmitButton: React.FC<MySubmitButtonProps> = ({
  name,
  value,
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
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};