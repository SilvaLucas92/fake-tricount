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
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = useCallback(async () => {
    const email = session?.data?.user?.email;
    setIsLoading(true);
    try {
      const response = await getAllCounts(email);
      setData(response);
    } catch (err) {
      setAlert({
        type: "error",
        msg: `something went wrong, Please try again later.`,
      });
    }
    setIsLoading(false);
  }, [session?.data?.user?.email]);

  useEffect(() => {
    apiCall();
  }, []);

  const onSubmit = async (values: Count) => {
    try {
      const payload = {
        counts: {
          ...values,
          created_by: session.data?.user?.email,
          participants: [values.participants, session.data?.user?.name],
        },
      };
      const response = await addNewCount(payload as any);
      if (response) {
        apiCall();
      }
    } catch (error) {
      setAlert({
        type: "error",
        msg: `something went wrong, Please try again later.`,
      });
    }
  };

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
        <AddForm
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
