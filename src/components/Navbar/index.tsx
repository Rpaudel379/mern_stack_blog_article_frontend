import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars2Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/src/hooks/states";
import { setMode, setLogout } from "@/src/states/slices/authSlice";
import Logodark from "/Logodark.svg";
import Logolight from "/Logolight.svg";

const Navbar = () => {
  const { mode } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const user = Boolean(useAppSelector((state) => state.authReducer.token));

  const [isBarsOpen, setIsBarsOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="flex items-center justify-between p-5 text-xl text-slate-900 dark:text-slate-100 md:px-10 lg:px-20">
        <div className="relative text-3xl font-bold">
          <Link to={"/"}>
            <img
              src={mode === "light" ? Logolight : Logodark}
              alt="logo"
              className=""
            />
          </Link>
        </div>

        <div className="hidden items-center space-x-10 font-bold lg:flex xl:space-x-16">
          <Link to="/">Home</Link>
          {user && <Link to="/account">Account</Link>}
          {user ? (
            <button
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <div onClick={() => dispatch(setMode())} className="cursor-pointer">
            {mode === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </div>
        </div>

        <div className="lg:hidden" onClick={() => setIsBarsOpen(!isBarsOpen)}>
          <Bars2Icon className="h-10 w-10 cursor-pointer" />
        </div>
      </div>

      {/* mobile menu */}
      {/* mobile menu */}
      <div
        className={`absolute top-0 z-10 h-screen w-full bg-slate-100 p-5 text-slate-900 dark:bg-slate-900 dark:text-slate-100  lg:hidden ${
          isBarsOpen ? "show" : "invisible"
        }`}
      >
        <div
          className=" flex justify-end"
          onClick={() => setIsBarsOpen(!isBarsOpen)}
        >
          <XMarkIcon className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="mt-20 flex flex-col space-y-20 text-center text-xl font-bold ">
          <Link to="/" onClick={() => setIsBarsOpen(false)}>
            Home
          </Link>
          {user && (
            <Link to="/account" onClick={() => setIsBarsOpen(false)}>
              Account
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                dispatch(setLogout());
                setIsBarsOpen(false);
              }}
            >
              logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <div
            onClick={() => dispatch(setMode())}
            className="mx-auto cursor-pointer"
          >
            {mode === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
