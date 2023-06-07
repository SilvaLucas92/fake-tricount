import Link from "next/link";
import { useState } from "react";
import { AddForm } from "./AddForm";
import clsx from "clsx";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

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
      <AddForm open={open} onOpenChange={setOpen} />
    </header>
  );
};

export default Navbar;
