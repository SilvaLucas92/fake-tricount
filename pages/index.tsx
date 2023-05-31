import AnimateComponent from "@/components/AnimateComponent/AnimateComponent";
import Counts from "@/components/Counts/Counts";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { SingleCount } from "@/components/SingleCount/SingleCount";
import { Inter } from "next/font/google";
import { useState } from "react";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<any>({});
  return (
    <div className="w-3/4 mx-auto">
      <AnimateComponent>
        <Navbar />
        <main>
          <Hero />
          <hr />
          {!data && <h2 className="p-10 text-5xl font-semibold">No Counts!</h2>}
          {data && (
            <div className={clsx("flex", "gap-5")}>
              <Counts />
              <SingleCount />
            </div>
          )}
        </main>
      </AnimateComponent>
    </div>
  );
}
