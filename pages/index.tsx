import AnimateComponent from "@/components/AnimateComponent/AnimateComponent";
import Counts from "@/components/Counts/Counts";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { SingleCount } from "@/components/SingleCount/SingleCount";
import { Inter } from "next/font/google";
import { useState } from "react";
import clsx from "clsx";
import { CustomSelect } from "@/components/Select";
const inter = Inter({ subsets: ["latin"] });

interface DataTypes {
  title: string;
  description: string;
  created_by: string;
  participants: string[];
  id: number;
}

const data: DataTypes[] = [
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

export default function Home() {
  const options = data?.map((item: any) => {
    return {
      value: item.title,
      label: item.title,
    };
  });
  console.log(options);
  return (
    <div className="w-3/4 mx-auto">
      <AnimateComponent>
        <Navbar />
        <main>
          <Hero />
          <hr />
          {!data && <h2 className="p-10 text-5xl font-semibold">No Counts!</h2>}
          {data && (
            <div className={clsx("flex", "gap-20", "mt-10")}>
              <div className="w-2/4">
                <CustomSelect data={options} placeholder={"Select..."} />
              </div>
              <SingleCount />
            </div>
          )}
        </main>
      </AnimateComponent>
    </div>
  );
}
