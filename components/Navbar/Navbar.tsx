import Link from "next/link";
import { useState } from "react";
import AddForm from "./AddForm";
import clsx from "clsx";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "../Button";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <header className={clsx("flex", "justify-between", "items-center", "py-5")}>
      <Link
        href="/"
        className="block font-bold  text-gray-900 text-2xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
      >
        SplitCounts
      </Link>
      <button
        type="submit"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={() => signOut()}
      >
        {" "}
        Sign out{" "}
      </button>
    </header>
  );
};

export default Navbar;
