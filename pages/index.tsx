import Counts from "@/components/Counts/Counts";
import Hero from "@/components/Hero/Hero";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Layout } from "@/components/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { ShowNotification } from "@/components/ShowNotification";
import { GetServerSidePropsContext } from "next";
import { AddButton } from "@/components/AddButton";
import AddForm from "@/components/Navbar/AddForm";
import { addNewCount, getAllCounts } from "@/services/counts";
import { Alert, Count } from "@/types/types";
import { Spinner } from "@/components/Spinner/Spinner";
import useFetch from "@/hooks/useFetch";
import AddModal from "@/components/AddModal";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const email = session?.data?.user?.email;

  const { data, isLoading, error, refetch } = useFetch(
    `/api/counts/getCounts?email=${email}`
  );

  const onSubmit = async (values: Count) => {
    try {
      const participant = Object.values(values?.participants);
      const payload = {
        counts: {
          title: values.title,
          description: values.description,
          created_by: session.data?.user?.email,
          participants: [...participant, session.data?.user?.name],
        },
      };
      const response = await addNewCount(payload as any);
      if (response) {
        refetch();
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

  return (
    <Layout>
      <main className="mb-20">
        <Hero />
        {alert && (
          <ShowNotification
            type={alert?.type}
            msg={alert?.msg}
            setAlert={setAlert}
          />
        )}
        {!isLoading && data?.length === 0 && (
          <div className="flex justify-between items-center">
            <h2 className="py-10 text-xl font-semibold">
              You don t have counts to show
            </h2>
            <AddButton onClick={() => setOpen(true)} />
          </div>
        )}
        {isLoading && <Spinner />}
        {data.length > 0 && !isLoading && (
          <div className={clsx("flex", "flex-col", "gap-5", "mt-10")}>
            <div className="flex justify-between items-center">
              <h4
                className={clsx(
                  "text-2xl",
                  "font-semibold",
                  "text-gray-900",
                  "self-center"
                )}
              >
                Counts
              </h4>
              <AddButton onClick={() => setOpen(true)} />
            </div>

            {data?.map((item, index) => (
              <Counts data={item as Count} key={index} />
            ))}
          </div>
        )}
        <AddModal
          open={open}
          onOpenChange={setOpen}
          onSubmit={onSubmit}
          formType="count"
        />{" "}
      </main>
    </Layout>
  );
}

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
