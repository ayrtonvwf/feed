import { HTMLInputTypeAttribute } from "react";
import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
};

export const MyInput: React.FC<MyInputProps> = ({ name, label, type }) => {
  /**
   * @see https://www.remix-validated-form.io/integrate-your-components
   */

  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...getInputProps({ id: name, type })}
        className="block w-full rounded-lg bg-gray-200 p-2"
      />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
