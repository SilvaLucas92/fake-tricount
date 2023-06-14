import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import clsx from "clsx";

export const ShowNotification = ({
  type,
  msg,
  setAlert,
}: {
  type: string;
  msg: string;
  setAlert: Dispatch<SetStateAction<{ type: string; msg: string } | null>>;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setAlert(null);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [setAlert]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 z-10 transition-all duration-300 rounded-md",
        type === "error"
          ? "bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          : "bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
      )}
    >
      <p className="font-bold">{type === "error" ? "Error" : "Success"}</p>
      <p>{msg}</p>
    </div>
  );
};
