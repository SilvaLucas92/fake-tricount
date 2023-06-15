import { useRouter } from "next/router";
import clsx from "clsx";
import { Layout } from "@/components/Layout/Layout";
import AddForm from "@/components/Navbar/AddForm";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AddButton } from "@/components/AddButton";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import {
  addNewDetail,
  deleteDetail,
  getAllDetails,
  updateDetail,
} from "@/services/countsDetails";
import { getCountByID } from "@/services/counts";
import { ShowNotification } from "@/components/ShowNotification";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { Alert, Count, CountItem, selectOptions } from "@/types/types";

interface DeleteModalProps {
  open: boolean;
  id: string;
}

const CountsDetails = () => {
  const { query } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<CountItem | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<DeleteModalProps>({
    open: false,
    id: "",
  });
  const [allCounts, setAllCounts] = useState([]);
  const [actualCount, setActualCount] = useState<Count | null>(null);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [debt, setDebt] = useState<string>("");
  const { data } = useSession();

  console.log(actualCount);

  const fetchData = useCallback(async () => {
    try {
      const id = query.id as string | undefined | null;
      const response = await getCountByID(id);
      setActualCount(response);
    } catch (err) {
      setAlert({
        type: "error",
        msg: "Something went wrong. Please try again later.",
      });
    }
  }, [query.id]);

  const fetchCountsDetails = useCallback(async () => {
    try {
      const id = query.id as string | undefined | null;
      const response = await getAllDetails(id);
      setAllCounts(response);
    } catch (err) {
      setAlert({
        type: "error",
        msg: "Something went wrong. Please try again later.",
      });
    }
  }, [query.id]);

  const totalAmountByPerson = allCounts.reduce(
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

  const result = Object.keys(totalAmountByPerson).reduce((acc, count) => {
    const amount = totalAmountByPerson[count];
    return acc + amount;
  }, 0);

  const onSubmit = useCallback(
    async (values: CountItem) => {
      try {
        const payload: { [key: string]: CountItem } = {
          countDetail: {
            ...values,
            countID: query?.id as string,
          },
        };
        const response = await addNewDetail(payload as any);
        if (response) {
          fetchCountsDetails();
        }
      } catch (error) {
        setAlert({
          type: "error",
          msg: `something went wrong, Please try again later.`,
        });
      }
    },
    [fetchCountsDetails, query.id]
  );

  const onDelete = async (id: string | undefined | null) => {
    try {
      const response = await deleteDetail(id);
      if (response) {
        fetchCountsDetails();
        setOpenDeleteModal({
          open: false,
          id: "",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        msg: `something went wrong, Please try again later.`,
      });
    }
  };

  const onUpdate = async (
    id: string | undefined | null,
    payload: CountItem
  ) => {
    try {
      const response = await updateDetail(id, payload);
      if (response) {
        fetchCountsDetails();
        setOpen(false);
      }
    } catch (error) {
      setAlert({
        type: "error",
        msg: `something went wrong, Please try again later.`,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateDebt = (results: Record<string, number>) => {
    const people = Object.keys(results);

    if (people.length !== 2) return "";

    const person1 = people[0];
    const person2 = people[1];

    const debt1 = totalAmountByPerson[person1] - totalAmountByPerson[person2];

    if (debt1 === 0) {
      return "They are even. There is no debt between them.";
    } else if (debt1 > 0) {
      return `${person2} owes $ ${debt1} to ${person1}.`;
    } else {
      return `${person1} owes $ ${Math.abs(debt1)} to ${person2}.`;
    }
  };

  useEffect(() => {
    fetchData();
    fetchCountsDetails();
    setDebt(calculateDebt(totalAmountByPerson));
  }, []);

  const selectOptions = [
    {
      value: actualCount?.participant,
      label: actualCount?.participant,
    },
    {
      value: data?.user?.name,
      label: data?.user?.name,
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-2.5 mt-5">
        <div className="flex justify-start items-center gap-2.5">
          <h2 className="text-2xl font-semibold text-gray-900">
            {actualCount?.title}
          </h2>
          {selectOptions.map((name) => (
            <>
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                {name.label}
              </span>
            </>
          ))}
        </div>
        {debt && <h3 className="text-lg font-normal ">Balance: {debt}</h3>}
      </div>
      <hr className="h-px mb-8 mt-5 bg-gray-200 border-0 "></hr>
      {allCounts.length === 0 ? (
        <div className="flex justify-between items-center">
          <h2 className="py-10 text-xl font-semibold">
            You don t have counts to show
          </h2>
          <AddButton onClick={() => setOpen(true)} />
        </div>
      ) : (
        <div className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow ">
          <div className="flex items-center justify-between mb-5">
            <h5 className="text-xl font-bold leading-none text-gray-900 ">
              Latest Counts
            </h5>
            <AddButton onClick={() => setOpen(true)} />
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 ">
              {allCounts.length > 0 &&
                allCounts.map((item: CountItem) => (
                  <li key={item._id} className="py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
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
                      <div className="flex flex-col justify-start">
                        <p className="text-md font-medium text-gray-900">
                          ${item.amount}
                        </p>
                        <div className="flex items-center gap-2">
                          <IconPencil
                            onClick={() => {
                              setOpen(true);
                              setEditData(item as CountItem);
                            }}
                            className="w-4 h-4 cursor-pointer text-green-600	"
                          />{" "}
                          <IconTrash
                            onClick={() =>
                              setOpenDeleteModal({
                                open: true,
                                id: item?._id,
                              })
                            }
                            className="w-4 h-4 cursor-pointer text-red-600"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">Total:</p>
                  <p className="text-base font-semibold text-gray-900">
                    ${result}{" "}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {alert && (
        <ShowNotification
          type={alert?.type}
          msg={alert?.msg}
          setAlert={setAlert}
        />
      )}
      <AddForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={editData ? onUpdate : onSubmit}
        formType="detail"
        participants={selectOptions as selectOptions[]}
        data={editData}
        setData={setEditData}
      />
      {openDeleteModal.open && (
        <DeleteModal
          open={openDeleteModal}
          onOpenChange={setOpenDeleteModal}
          onDelete={() => onDelete(openDeleteModal.id)}
        />
      )}
    </Layout>
  );
};

export default CountsDetails;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
