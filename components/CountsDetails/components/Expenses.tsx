import { AddButton } from "@/components/AddButton";
import TooltipComponent from "@/components/Tooltip";
import { Count, CountItem } from "@/types/types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

const Expenses = ({
  setOpen,
  dataDetails,
  setEditData,
  setOpenDeleteModal,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  dataDetails: CountItem[];
  setEditData: Dispatch<SetStateAction<CountItem | null>>;
  setOpenDeleteModal: Dispatch<
    SetStateAction<{
      open: boolean;
      id: string;
    }>
  >;
}) => {
  if (dataDetails.length === 0)
    return (
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-lg font-semibold text-gray-900 ">
          No Expenses, please add one!
        </h5>
        <AddButton onClick={() => setOpen(true)} />
      </div>
    );
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-lg font-semibold text-gray-900 ">Latest Counts</h5>
        <AddButton onClick={() => setOpen(true)} />
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 ">
          {dataDetails.length > 0 &&
            dataDetails.map((item: CountItem) => (
              <li key={item._id} className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-md font-medium text-gray-900">
                      {item.title}
                    </p>

                    <p className="text-md font-medium text-gray-600">
                      Paid by:{" "}
                      <span className="text-md font-medium text-gray-900">
                        {item.paid_by}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col justify-end  gap-2">
                    <p className="text-md font-medium text-gray-900">
                      ${item.amount}
                    </p>
                    <div className="flex items-center gap-2 justify-end">
                      <TooltipComponent label="Edit">
                        <IconPencil
                          onClick={() => {
                            setOpen(true);
                            setEditData(item as CountItem);
                          }}
                          className="w-4 h-4 cursor-pointer text-green-600"
                        />
                      </TooltipComponent>{" "}
                      <TooltipComponent label="Delete">
                        <IconTrash
                          onClick={() =>
                            setOpenDeleteModal({
                              open: true,
                              id: item?._id,
                            })
                          }
                          className="w-4 h-4 cursor-pointer text-red-600"
                        />
                      </TooltipComponent>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Expenses;
