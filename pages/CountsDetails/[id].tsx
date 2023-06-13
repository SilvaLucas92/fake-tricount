import { useRouter } from "next/router";
import clsx from "clsx";
import { Layout } from "@/components/Layout/Layout";
import AddForm from "@/components/Navbar/AddForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const CountsDetails = () => {
  const { query } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const session = useSession();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/details/addNew", {
        countDetail: {
          ...values,
          countID: query.id,
        },
      });
      if (response?.data) {
        alert("okkkk");
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <button type="submit" onClick={() => setOpen(true)}>
        {" "}
        submt
      </button>
      <AddForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={onSubmit}
        formType="detail"
      />
    </Layout>
  );
};

export default CountsDetails;
