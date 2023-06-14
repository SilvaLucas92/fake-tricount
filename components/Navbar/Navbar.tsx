import Link from "next/link";
import { useState } from "react";
import AddForm from "./AddForm";
import clsx from "clsx";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "../Button";
import { signOut } from "next-auth/react";

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
        className={clsx("block", "font-bold", "text-gray-900", "text-2xl")}
      >
        Split Counts
      </Link>
      <button
        type="submit"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => signOut()}
      >
        {" "}
        Sign out{" "}
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
