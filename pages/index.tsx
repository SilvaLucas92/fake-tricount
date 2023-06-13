import AnimateComponent from "@/components/AnimateComponent/AnimateComponent";
import Counts from "@/components/Counts/Counts";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Layout } from "@/components/Layout/Layout";
import { Input } from "@/components/Input";
import { useCallback, useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

interface DataTypes {
  title: string;
  description: string;
  created_by: string;
  participants: string[];
  id: number;
}

const datas: DataTypes[] = [
  {
    title: "Marzo",
    description: "gastos hogar",
    created_by: "Lucas Silva",
    participants: ["Lucas Silva", "Candela Palomba"],
    id: 1,
  },
  {
    title: "Abril",
    description: "facturas",
    created_by: "Ana Perez",
    participants: ["Lucas Silva", "Candela Palomba"],
    id: 2,
  },
  {
    title: "Mayo",
    description: "compras",
    created_by: "Juan Gomez",
    participants: ["Lucas Silva", "Candela Palomba"],
    id: 3,
  },
];

import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const session = useSession();
  const [data, setData] = useState([]);

  const apiCall = useCallback(async () => {
    const email = session?.data?.user?.email;
    try {
      const response = await axios.get(`/api/counts/getCounts?email=${email}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    apiCall();
  }, [apiCall, data]);

  console.log(data);

  return (
    <Layout>
      <main>
        <Hero />
        <hr />
        {!data && <h2 className="p-10 text-5xl font-semibold">No Counts!</h2>}
        {data && (
          <div className={clsx("flex", "flex-col", "gap-5", "mt-10")}>
            {data?.map((item) => (
              <Counts data={item as DataTypes} key={item?.title} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
