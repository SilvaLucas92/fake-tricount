import clsx from "clsx";
import { useEffect, useState } from "react";

const Balance = ({
  totalByMember,
  data
}: {
  totalByMember: Record<string, number>;
  data: any
}) => {
  const [debt, setDebt] = useState<string | undefined>("");

  const calculateDebts = (debts: Record<string, number>) => {
    const values = Object.keys(debts);
    if (values.length <= 1) return;
    const totalSum = Object.keys(debts).reduce(
      (total, debt) => total + debts[debt],
      0
    );
    const average = totalSum / values.length;
    const value1 = average - debts[values[0]];
    const value2 = average - debts[values[1]];

    let result;
    if (value1 > 0) {
      result = `${values[0]} owes ${value1} to ${values[1]}`;
      setDebt(result);
    }
    result = `${values[1]} owes ${value2} to ${values[0]}`;
    setDebt(result);
  };

  const result = Object.keys(totalByMember).reduce((acc, count) => {
    const amount = totalByMember[count];
    return acc + amount;
  }, 0);

  useEffect(() => {
    calculateDebts(totalByMember);
  }, [totalByMember]);

  return (
    <div className="flex flex-col gap-2.5">
      {Object.keys(totalByMember).length !== 0 ? (
        <>
          {Object.keys(totalByMember).map((item) => (
            <div
              className="flex items-center justify-between gap-2.5"
              key={item}
            >
              <p className="text-md font-medium text-gray-900">{item} </p>
              <div className="flex items-center">
                <span
                  className={clsx(
                    "font-semibold",
                    totalByMember[item] < 0 ? "text-red-500" : "text-green-500"
                  )}
                >
                  {" "}
                  $ {totalByMember[item]}
                </span>
              </div>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900">Total:</p>
            <p className="text-base font-semibold text-gray-900">${result} </p>
          </div>
          <p className="text-base font-semibold text-gray-900">{debt}</p>
        </>
      ) : (
        <h5 className="text-lg font-semibold text-gray-900 ">No Expenses.</h5>
      )}
    </div>
  );
};

export default Balance;



// const splitCount = (values) => {
//   const totalByPersonObj = values.reduce(
//     (result: Record<string, number>, item: CountItem) => {
//       const paidBy = item?.paid_by;
//       const amount = item?.amount;

//       if (!(result as Record<string, number>)[paidBy]) {
//         (result as Record<string, number>)[paidBy] = 0;
//       }

//       result[paidBy] += amount;

//       return result;
//     },
//     {}
//   );
  
//     const total = Object.keys(totalByPersonObj).reduce((acc, count) => {
//     const amount = totalByPersonObj[count];
//     return acc + amount;
//   }, 0);
  
//   const totalToPay = total / Object.keys(totalByPersonObj).length
  
//   let positiveTotals = []
//   let negativeTotals = []
//   for(let key in totalByPersonObj) {
//     const value = totalByPersonObj[key] - totalToPay
//     if(value < 0) {
//       negativeTotals.push({[key]: value})
//     }
//     if(value >= 0) {
//       positiveTotals.push({[key]: value})
//     }
//   }
  
//   return {
//     total,
//     totalPaid: totalByPersonObj,
//     totalToPayByPerson: totalToPay,
//     positives: positiveTotals, 
//     negatives: negativeTotals
//   }
// }
