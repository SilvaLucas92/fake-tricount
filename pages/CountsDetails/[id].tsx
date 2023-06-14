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
import { addNewDetail, getAllDetails } from "@/services/countsDetails";
import { getCountByID } from "@/services/counts";
import { ShowNotification } from "@/components/ShowNotification";

interface Alert {
  type: string;
  msg: string;
}
const CountsDetails = () => {
  const { query } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
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
      {allCounts.length === 0 && (
        <div className="flex justify-between items-center">
          <h2 className="py-10 text-xl font-semibold">
            You don t have counts to show
          </h2>
          <AddButton onClick={() => setOpen(true)} />
        </div>
      )}

      {allCounts.length > 0 && (
        <div className={clsx("flex", "flex-col", "gap-5", "mt-10")}>
          <div className="flex justify-between items-center w-full mb-10">
            <h4>Count Detail</h4>
            <AddButton onClick={() => setOpen(true)} />
          </div>
          {allCounts.map(
            (item: { title: string; amount: number; paid_by: string }) => (
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
                  "px-10"
                )}
                key={item?.title}
              >
                <div className="flex-col">
                  <h5 className="font-semibold">{item?.title}</h5>
                  <p>{`ha sido pagado por ${item?.paid_by}`}</p>
                </div>
                <div>
                  <h5 className="font-semibold">{`$ ${item?.amount}`}</h5>
                </div>
              </div>
            )
          )}
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
        onSubmit={onSubmit}
        formType="detail"
        participants={selectOptions}
      />
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
