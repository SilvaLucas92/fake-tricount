import { CountItem } from "@/types/types";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

const Balance = ({ data }: { data: CountItem[] }) => {
  const [values, setValues] = useState<any>();

  const splitCount = useCallback((values: CountItem[]) => {
    const totalByPersonObj = values.reduce(
      (result: Record<string, number>, item: CountItem) => {
        const paidBy = item?.paid_by;
        const amount = item?.amount;

        if (!(result as Record<string, number>)[paidBy]) {
          (result as Record<string, number>)[paidBy] = 0;
        }

        result[paidBy] += amount;

        return result;
      },
      {}
    );

    const total = Object.keys(totalByPersonObj).reduce((acc, count) => {
      const amount = totalByPersonObj[count];
      return acc + amount;
    }, 0);

    const totalToPay = total / Object.keys(totalByPersonObj).length;

    let positiveTotals = {};
    let negativeTotals = {};
    for (let key in totalByPersonObj) {
      const value = totalByPersonObj[key] - totalToPay;
      if (value < 0) {
        (negativeTotals as any)[key] = value;
      }
      if (value >= 0) {
        (positiveTotals as any)[key] = value;
      }
    }

    return {
      total,
      totalPaidByPerson: totalByPersonObj,
      totalToPayByPerson: totalToPay,
      positives: positiveTotals,
      negatives: negativeTotals,
    };
  }, []);

  useEffect(() => {
    setValues(splitCount(data));
  }, [splitCount, data]);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">
          Total to pay by person:
        </p>
        <p className="text-base font-normal text-gray-800">
          ${values?.totalToPayByPerson}
        </p>
      </div>
      <div>
        <p className="text-lg  font-semibold text-gray-900">
          Total paid by member
        </p>
        {values?.totalPaidByPerson &&
          Object?.keys(values?.totalPaidByPerson).map((item) => {
            return (
              <StackCol
                label={item}
                value={values?.totalPaidByPerson[item]}
                key={item}
              />
            );
          })}
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-900">Negative balance</p>
        {Object.entries(values?.negatives || {}).map(([person, balance]) => (
          <StackCol
            label={person}
            value={balance as number}
            color="text-red-400"
            key={person}
          />
        ))}
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-900">Positive balance</p>
        {Object.entries(values?.positives || {}).map(([person, balance]) => (
          <StackCol
            label={person}
            value={balance as number}
            color="text-green-400"
            key={person}
          />
        ))}
      </div>

      <StackCol label="Total" value={values?.total} />
    </div>
  );
};

export default Balance;

export const StackCol = ({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color?: string;
}) => (
  <div className="flex items-center justify-between">
    <p className="text-lg font-normal text-gray-700">{label}</p>
    <p
      className={clsx(
        "text-base' ,'font-normal', 'text-gray-600",
        color && color
      )}
    >
      ${value}
    </p>
  </div>
);
