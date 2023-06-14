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

interface Alert {
  type: string;
  msg: string;
}
const CountsDetails = () => {
  const { query } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<any>({
    open: false,
    id: "",
  });
  const [allCounts, setAllCounts] = useState([]);
  const [actualCount, setActualCount] = useState<any>([]);
  const [alert, setAlert] = useState<Alert | null>(null);
  const { data } = useSession();

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

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const payload = {
          countDetail: {
            ...values,
            countID: query.id,
          },
        };
        const response = await addNewDetail(payload);
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

  const onUpdate = async (id: string | undefined | null, payload: any) => {
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

  useEffect(() => {
    fetchData();
    fetchCountsDetails();
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
      <div>
        <h2>{actualCount.title}</h2>
        <h3>Balance</h3>
      </div>
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
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Counts
            </h5>
            <AddButton onClick={() => setOpen(true)} />
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {allCounts.length > 0 &&
                allCounts.map(
                  (item: {
                    title: string;
                    amount: number;
                    paid_by: string;
                    _id: string;
                  }) => (
                    <li key={item._id} className="py-3 sm:py-4">
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                          <p className="text-md font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <IconPencil
                            onClick={() => {
                              setOpen(true);
                              setEditData(item);
                            }}
                            className="w-4 h-4 cursor-pointer"
                          />{" "}
                          <IconTrash
                            onClick={() =>
                              setOpenDeleteModal({
                                open: true,
                                id: item?._id,
                              })
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          ${item.amount}
                        </div>
                      </div>
                    </li>
                  )
                )}
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
        participants={selectOptions}
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
