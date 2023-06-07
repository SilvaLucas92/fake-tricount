import clsx from "clsx";
import { useRouter } from "next/router";
import { CustomSelect } from "../Select";

const Counts = ({ data }: any) => {
  const { push } = useRouter();
  return (
    <div
      className={clsx(
        "w-full",
        "border",
        "border-gray-100",
        "rounded-md",
        "flex",
        "justify-between",
        "items-center",
        "py-5",
        "px-5",
        "cursor-pointer"
      )}
      onClick={() => push(`/CountsDetails/${data.id}`)}
    >
      <div className="flex-col">
        <h5 className="font-semibold">{data.title}</h5>
        <p>{data.description}</p>
      </div>
      <div>
        <div className="flex-col">
          <p className="font-semibold">{data.created_by}</p>
        </div>
      </div>
    </div>
  );
};

export default Counts;
