import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Count } from "@/types/types";

interface Context {
  actualCount: Count | null;
  setActualCount: Dispatch<SetStateAction<Count | null>>;
}

export const CountContext = createContext<Context>({
  actualCount: null,
  setActualCount: () => null,
});

export const CountContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [actualCount, setActualCount] = useState<Count | null>(null);

  return (
    <CountContext.Provider value={{ actualCount, setActualCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => useContext(CountContext);
