import { useRouter } from "next/router";
import clsx from "clsx";
import { Layout } from "@/components/Layout/Layout";

const CountsDetails = () => {
  const { query } = useRouter();

  return (
    <Layout>
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
      >
        <div className="flex-col">
          <h5 className="font-semibold">ABL</h5>
          <p>ha sido pagado por lucas</p>
        </div>
        <div>
          <h5 className="font-semibold">$5000</h5>
          <p>06/12/24</p>
        </div>
      </div>
    </Layout>
  );
};

export default CountsDetails;
