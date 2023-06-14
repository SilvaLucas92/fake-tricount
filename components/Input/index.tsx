import clsx from "clsx";

export const Input = ({
  name,
  error,
  label,
  disabled,
  value,
  onChange,

  type,
  placeholder,
}: {
  name: string;
  error?: any;
  label?: string;
  disabled?: boolean;
  value?: string;
  onChange?: any;
  placeholder?: string;
  type: string;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={"block mb-2 text-sm font-medium text-gray-900"}
      >
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        className={clsx(
          "bg-gray-50",
          "border",
          "border-gray-300",
          "text-gray-900",
          "text-sm",
          "rounded-lg",
          "block",
          "w-full",
          "p-2.5",
          error &&
            "border-red-600 ring-1 ring-inset ring-red-600 focus:ring-2 focus:ring-inset focus:ring-red-600",
          disabled && "opacity-50 cursor-default"
        )}
        placeholder={placeholder ?? ""}
      />

      {error && <span className="text-[13px] text-red-600">{error}</span>}
    </div>
  );
};
