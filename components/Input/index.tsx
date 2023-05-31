import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Input = ({
  name,
  error,
  title,
}: {
  name: string;
  error?: string;
  title: string;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={clsx("mb-2", "block", "text-sm", "font-medium")}
      >
        {title}
      </label>
      <input
        name={name}
        className={clsx(
          "w-full",
          "bg-gray-50",
          "border",
          "border-gray-300",
          "py-2.5",
          "rounded-md",
          "px-1"
        )}
      />
      {error && <span className="text-[13px] text-red-600">{error}</span>}
    </div>
  );
};
