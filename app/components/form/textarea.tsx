import { useField } from "remix-validated-form";

type MyTextareaProps = {
  name: string;
  label: string;
};

export const MyTextarea: React.FC<MyTextareaProps> = ({ name, label }) => {
  /**
   * @see https://www.remix-validated-form.io/integrate-your-components
   */

  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        {...getInputProps({ id: name })}
        className="block w-full rounded-lg bg-gray-200 p-2"
      />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
