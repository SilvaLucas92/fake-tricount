import clsx from "clsx";

interface BtnProps {
  text: string;
  variant: "light" | "filled";
  classname?: any;
}

export const Button = ({ text, variant, classname }: BtnProps) => {
  const variantType = {
    light: clsx("bg-gray-200", "text-white", 'hover:bg-white', 'hover:text-black'),
    filled: clsx("bg-black", "text-white", 'hover:bg-gray-200', 'hover:text-black'),
  };
  return (
    <button
      type="submit"
      className={clsx(
        (variantType as any)[variant],
        "py-2.5",
        "rounded-md",
        'text-center', 
        'cursor-pointer',
        'px-1',
        classname
      )}
    >
      {text}
    </button>
  );
};
