import { TrashIcon } from "@heroicons/react/24/solid";

import useEditDashboard from "@hooks/useEditDashboard";

const Dashboard = () => {
  const {
    handleChange,
    handleDelete,
    loading,
    handleSubmit,
    error,
    errorHighlight,
    user,
    setUser,
    initialUser,
  } = useEditDashboard();

  return (
    <div className="mx-auto w-full px-4 py-10 sm:px-6 lg:w-5/6 lg:px-8 lg:py-14">
      <div className="relative rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-7">
        <div className="mb-8 flex justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your username and password.
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-x-1.5 rounded-md border bg-white px-2.5 py-1.5 align-middle text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white  sm:gap-x-2 sm:px-3 sm:py-2 sm:text-sm"
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
            Delete Your Account
          </button>
        </div>

        {loading && (
          <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-slate-100/80 ">
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {error && <p className="my-4 text-red-600">{error}</p>}

          <div className="grid gap-2 sm:grid-cols-6 sm:gap-6">
            <div className="sm:col-span-1">
              <label
                className={`mt-2.5 inline-block text-sm  ${
                  errorHighlight.username
                    ? "text-red-500"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                username
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="sm:flex">
                <input
                  type="text"
                  name="username"
                  className={`relative -ml-px -mt-px block w-full border-slate-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-slate-500 focus:ring-slate-500 dark:border-gray-700 dark:bg-slate-900 dark:text-slate-400 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none ${
                    errorHighlight.username && "!border-red-500"
                  }`}
                  value={user.username}
                  onChange={handleChange}
                  placeholder="change username"
                />
              </div>
            </div>

            <div className="sm:col-span-2"></div>

            <div className="sm:col-span-1">
              <label
                className={`mt-2.5 inline-block text-sm  ${
                  errorHighlight.password ? "text-red-500" : "text-gray-800"
                } dark:text-gray-200`}
              >
                Password
              </label>
            </div>

            <div className="sm:col-span-3">
              <input
                type="text"
                name="password"
                value={user.password}
                className={`block w-full rounded-lg border-slate-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500 dark:border-gray-700 dark:bg-slate-900 dark:text-slate-400 ${
                  errorHighlight.password && "!border-red-500"
                }`}
                placeholder="Enter new password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-x-2">
            <button
              onClick={() => setUser(initialUser)}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /*    <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-email"
                type="email"
                className="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                placeholder="maria@site.com"
              />
            </div> */
}
