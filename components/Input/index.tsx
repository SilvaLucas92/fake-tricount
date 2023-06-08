import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Input = ({
  name,
  error,
  label,
  disabled,
  value,
  onChange,
  onBlur,
  type,
}: {
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  onChange?: any;
  onBlur?: boolean;

  type: string;
}) => {
  return (
    <div className="my-5 py-5">
      <label
        htmlFor={name}
        className={clsx("mb-2", "block", "text-sm", "font-medium")}
      >
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        className={clsx(
          "w-full",
          "bg-white",
          "border",
          // "border-black",
          "py-2.5",
          "rounded-md",
          "px-1",
          // "focus:ring-2",
          // "focus:ring-inset",
          // "focus:ring-gray-300",
          // "ring-1",
          // "ring-inset",
          // "ring-gray-300",
          error &&
            "border-red-600 ring-1 ring-inset ring-red-600 focus:ring-2 focus:ring-inset focus:ring-red-600 ",
          disabled && "opacity-50 cursor-default"
        )}
      />
      {error && <span className="text-[13px] text-red-600">{error}</span>}
    </div>
  );
};
