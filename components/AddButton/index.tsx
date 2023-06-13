import { IconPlus } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

type AddButtonProps = {
  onClick: Dispatch<SetStateAction<boolean>>;
};

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button
      onClick={onClick as () => void}
      className="inline-flex items-center px-2 py-2 border border-gray-300 bg-white hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-full"
    >
      <IconPlus />
    </button>
  );
};
