import Link from "next/link";
import { useState } from "react";
import AddForm from "./AddForm";
import clsx from "clsx";
import axios from "axios";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const session = useSession();
  const onSubmit = async (values: any, formik: any) => {
    try {
      const response = await axios.post("/api/counts/addCounts", {
        counts: { ...values, created_by: session.data?.user?.email },
      });
      if (response?.data) {
        formik.resetForm();
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={clsx("flex", "justify-between", "items-center", "py-5")}>
      <Link
        href="/"
        className={clsx("block", "font-bold", "text-gray-900", "text-lg")}
      >
        Fake tricount
      </Link>
      <button
        onClick={() => setOpen(true)}
        className={clsx(
          "rounded-md",
          "px-3.5",
          "py-2.5",
          "bg-indigo-600",
          "shadow-sm",
          "hover:bg-indigo-200",
          "block",
          "font-semibold",
          "text-white"
        )}
      >
        Add
      </button>
      <AddForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={onSubmit}
        formType={"count"}
      />
    </header>
  );
};

export default Navbar;
