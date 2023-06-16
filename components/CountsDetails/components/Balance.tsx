import { CountItem } from "@/types/types";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

const Balance = ({
  result,
  data,
  totalByMember,
}: {
  result: number;
  data: CountItem[];
  totalByMember: Record<string, number>;
}) => {
  const balance = Object?.keys(totalByMember).map((item) => {
    const value = totalByMember[item];
    return {
      name: item,
      amount: value - result / Object?.keys(totalByMember).length,
    };
  });
  return (
    <div className="flex flex-col gap-2.5">
      {balance.map((item) => (
        <div
          className="flex items-center justify-between gap-2.5"
          key={item.name}
        >
          <p className="text-md font-medium text-gray-900">{item?.name} </p>
          <div className="flex items-center">
            {item.amount < 0 ? (
              <ArrowDownIcon color="red" />
            ) : (
              <ArrowUpIcon color="green" />
            )}
            <span
              className={clsx(
                "font-semibold",
                item.amount < 0 ? "text-red-500" : "text-green-500"
              )}
            >
              {" "}
              $ {item.amount}
            </span>
          </div>
        </div>
      ))}
      <hr className="my-2"/>
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-gray-900">Total:</p>
        <p className="text-base font-semibold text-gray-900">${result} </p>
      </div>
    </div>
  );
};

export default Balance;
