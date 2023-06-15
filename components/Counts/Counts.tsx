import { useCount } from "@/context/context";
import { Count } from "@/types/types";
import clsx from "clsx";
import { useRouter } from "next/router";

const Counts = ({ data }: { data: Count }) => {
  const { push } = useRouter();
  const { setActualCount } = useCount();

  return (
    <div
      className={clsx(
        "w-full",
        "border",
        "border-gray-200",
        "shadow",
        "rounded-md",
        "flex",
        "justify-between",
        "items-center",
        "py-5",
        "px-5",
        "cursor-pointer",
        "bg-white"
      )}
      onClick={() => {
        push(`/CountsDetails/${data._id}`);
        setActualCount(data);
      }}
    >
      <div className="flex-col">
        <h5 className="font-semibold">{data.title}</h5>
        <p>{data.description}</p>
      </div>
      <div className="hidden sm:flex flex-col">
        <p className="font-semibold">{data.created_by}</p>
      </div>
    </div>
  );
};

export default Counts;
