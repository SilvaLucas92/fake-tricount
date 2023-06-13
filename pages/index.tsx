import Counts from "@/components/Counts/Counts";
import Hero from "@/components/Hero/Hero";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Layout } from "@/components/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { ShowNotification } from "@/components/ShowNotification";
import { GetServerSidePropsContext } from "next";
import { AddButton } from "@/components/AddButton";
import AddForm from "@/components/Navbar/AddForm";

const inter = Inter({ subsets: ["latin"] });

interface DataTypes {
  title: string;
  description: string;
  created_by: string;
  participants: string[];
  id: number;
}

interface Alert {
  type: string;
  msg: string;
}

export default function Home() {
  const session = useSession();
  const [shouldFetch, setShouldFetch] = useState(true);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState<Alert | null>(null);
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const apiCall = useCallback(async () => {
    const email = session?.data?.user?.email;
    try {
      const response = await axios.get(`/api/counts/getCounts?email=${email}`);
      setData(response.data);
    } catch (err) {
      setAlert({
        type: "error",
        msg: `something went wrong, Please try again later.`,
      });
    }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (shouldFetch) {
      apiCall();
      setShouldFetch(false);
    }
  }, [data, shouldFetch]);

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post("/api/counts/addCounts", {
        counts: { ...values, created_by: session.data?.user?.email },
      });
      if (response?.data) {
        setShouldFetch(true);
        return response.data;
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
      <main>
        <Hero />
        {alert && (
          <ShowNotification
            type={alert?.type}
            msg={alert?.msg}
            setAlert={setAlert}
          />
        )}
        <hr />
        {data && data?.length === 0 && (
          <div className="flex justify-between items-center">
            <h2 className="py-10 text-xl font-semibold">
              You don t have counts to show
            </h2>
            <AddButton onClick={() => setOpen(true)} />
          </div>
        )}
        {data.length > 0 && (
          <div className={clsx("flex", "flex-col", "gap-5", "mt-10")}>
            <div className="flex justify-between items-center">
              <h4>Counts</h4>
              <AddButton onClick={() => setOpen(true)} />
            </div>
            {data?.map((item, index) => (
              <Counts data={item as DataTypes} key={index} />
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
