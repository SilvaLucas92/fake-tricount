import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout/Layout";
import {
  addNewDetail,
  deleteDetail,
  updateDetail,
} from "@/services/countsDetails";
import { ShowNotification } from "@/components/ShowNotification";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { Alert, CountItem, selectOptions } from "@/types/types";
import { useCount } from "@/context/context";
import * as Tabs from "@radix-ui/react-tabs";
import Expenses from "./components/Expenses";
import Balance from "./components/Balance";
import TooltipComponent from "../Tooltip";
import { Spinner } from "../Spinner/Spinner";
import useFetch from "@/hooks/useFetch";
import AddModal from "../AddModal";

interface DeleteModalProps {
  open: boolean;
  id: string;
}

const Detail = () => {
  const { query } = useRouter();
  const { actualCount } = useCount();
  const [open, setOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<CountItem | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<DeleteModalProps>({
    open: false,
    id: "",
  });
  const [alert, setAlert] = useState<Alert | null>(null);
  const id = query.id;

  const { data, isLoading, error, refetch } = useFetch(
    `/api/details/getDetailsCounts?id=${id}`
  );

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
          refetch();
        }
      } catch (error) {
        setAlert({
          type: "error",
          msg: `something went wrong, Please try again later.`,
        });
      }
    },
    [refetch, query.id]
  );

  const onDelete = async (id: string | undefined | null) => {
    try {
      const response = await deleteDetail(id);
      if (response) {
        refetch();
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
        refetch();
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
    if (error) {
      setAlert({ type: "error", msg: "Something went wrong" });
    }
  }, [error]);

  const selectOptions = actualCount?.participants.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="flex flex-col gap-2.5 mt-5">
            <div className="flex  items-center gap-2.5">
              <h2 className="text-2xl font-semibold text-gray-900">
                {actualCount?.title}
              </h2>

              <TooltipComponent
                label={actualCount?.participants?.map((item) => (
                  <p key={item}> {item}</p>
                ))}
              >
                <span className=" cursor-pointer bg-teal-100 text-teal-800 text-xs font-medium  p-1 rounded">
                  {`${actualCount?.participants?.length} members`}
                </span>
              </TooltipComponent>
            </div>
          </div>
          <Tabs.Root
            className="flex flex-col w-full shadow-md my-5 rounded"
            defaultValue="expenses"
          >
            <Tabs.List
              className="shrink-0 flex border-b border-gray-200"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="expenses"
              >
                <p className="text-md font-medium text-gray-900">Expenses</p>
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="balance"
              >
                <p className="text-md font-medium text-gray-900">Balance</p>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="expenses"
            >
              <Expenses
                setOpen={setOpen}
                dataDetails={data}
                setEditData={setEditData}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="balance"
            >
              <Balance data={data} actualCount={actualCount} />
            </Tabs.Content>
          </Tabs.Root>
        </>
      )}

      {alert && (
        <ShowNotification
          setAlert={setAlert}
          type={alert?.type}
          msg={alert?.msg}
        />
      )}
      <AddModal
        open={open}
        onOpenChange={setOpen}
        onSubmit={editData ? onUpdate : onSubmit}
        formType="detail"
        participants={selectOptions as selectOptions[]}
        data={editData}
        setData={setEditData as any}
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

export default Detail;
