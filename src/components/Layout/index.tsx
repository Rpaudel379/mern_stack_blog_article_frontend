import React from "react";
import Navbar from "@components/Navbar";
import { useAppSelector } from "@/src/hooks/states";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const mode = useAppSelector((state) => state.authReducer.mode);
  return (
    <div
      className={`${mode} ${mode === "light" ? "bg-white" : "bg-slate-950"}`}
    >
      <div className="mx-auto min-h-screen flex flex-col  max-w-7xl bg-white dark:bg-slate-950">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;
