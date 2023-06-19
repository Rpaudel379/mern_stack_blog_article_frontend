// import { useState } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link, Outlet, useLocation } from "react-router-dom";
import AllBlogs from "@components/Home/AllBlogs";

import { useAppSelector } from "@hooks/states";

const Home = () => {
  const user = Boolean(useAppSelector((state) => state.authReducer.token));

  // const [search, setSearch] = useState("");
  const { pathname } = useLocation();


  return (
    <div className="flex grow flex-col">
      {/* links */}

      <div className="mt-16 flex items-center justify-between">
        {!user ? (
          <div>
            <Link
              to="/login"
              className={`rounded-md  bg-slate-700 px-4 py-3
             text-sm font-semibold text-slate-50  transition-all hover:bg-gray-800 dark:bg-slate-600  dark:hover:bg-slate-700`}
            >
              Login to add blog
            </Link>
          </div>
        ) : (
          <div className="space-x-5">
            <Link
              to={"/"}
              className={`rounded-md border border-transparent ${
                pathname === "/"
                  ? "bg-slate-700 text-slate-50 dark:bg-slate-500 dark:hover:bg-slate-600"
                  : "bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600"
              } px-4 py-3 text-sm font-semibold  ring-offset-white transition-all hover:bg-gray-800 hover:text-white  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-900`}
            >
              All Blogs
            </Link>
            <Link
              to={"/myblogs"}
              className={`rounded-md border border-transparent ${
                pathname === "/myblogs"
                  ? "bg-slate-700 text-slate-50 dark:bg-slate-500 dark:hover:bg-slate-600"
                  : "bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600"
              } px-4 py-3 text-sm font-semibold  ring-offset-white transition-all hover:bg-gray-800 hover:text-white  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-900`}
            >
              My Blogs
            </Link>
          </div>
        )}

        {user && (
          <div>
            <Link
              to={"/blog/add"}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 `}
            >
              Add Blog
            </Link>
          </div>
        )}
      </div>

      {/* end of links */}

      {/* card blog */}
      {pathname === "/" && <AllBlogs />}
      {/* end of card blog */}

      <Outlet />
    </div>
  );
};

export default Home;

{
  /* search */
}
{
  /* <div className="mt-10 sm:w-2/3">
        <div className="relative flex rounded-md shadow-sm">
          <input
            type="text"
            className="block w-full rounded-l-md border-slate-200 px-4 py-3 pl-11 text-sm shadow-sm  focus:border-slate-500 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            placeholder="Search Blog"
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon className="h-4 w-4 text-slate-400 " />
          </div>

          <button
            type="button"
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-r-md border border-transparent bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-800 dark:hover:bg-slate-900"
          >
              <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </span>
            Search
          </button>
        </div>
      </div> */
}
{
  /* end of search */
}
