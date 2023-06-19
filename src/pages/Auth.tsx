import useAuth from "@/src/hooks/useAuth";

const Auth = () => {
  const {
    handleChange,
    loading,
    error,
    errorHighlight,
    handleSubmit,
    isLogin,
    handleToggleForm,
  } = useAuth();

  return (
    <div className="flex justify-center">
      <div className="relative w-full rounded-2xl border bg-slate-50 p-5 shadow-xl dark:bg-slate-900 dark:text-white md:max-w-md">
        <p className="text-4xl font-bold">
          {isLogin ? "Login to you account" : "Create a new account"}
        </p>

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

        <form className="login form mt-10 space-y-7" onSubmit={handleSubmit}>
          {error && <p className="text-red-600">{error}</p>}

          {/* place for email -> maybe in future */}

          <div>
            <label
              htmlFor="username"
              className={`${errorHighlight.username && "text-red-500"}`}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              className={`${errorHighlight.username && "!border-red-500"}`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between ">
              <label
                htmlFor="password"
                className={`${errorHighlight.password && "text-red-500"}`}
              >
                Password
              </label>
              {/* place for for forgot password -> maybe in future */}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className={`${errorHighlight.password && "!border-red-500"}`}
            />
          </div>
          <div className="text-md flex justify-between font-semibold">
            <button
              type="submit"
              className="rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
            {isLogin ? (
              <button
                onClick={handleToggleForm}
                type="button"
                className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-400"
              >
                Not yet created?
              </button>
            ) : (
              <>
                <button
                  onClick={handleToggleForm}
                  type="button"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-400"
                >
                  Already a User?
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

/* 

  useEffect(() => {
    if (error.length) {
      if (error.includes("username or email")) {
        setErrorHighlight({ ...errorHighlight, username: true, email: true });
      } else if (error.includes("username")) {
        setErrorHighlight({ ...errorHighlight, username: true });
      } else if (error.includes("password")) {
        setErrorHighlight({ ...errorHighlight, password: true });
      } else {
        setErrorHighlight({ ...errorHighlight, email: true });
      }
    }
  }, [error]);
*/

/* 
     {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="email"
                  className={`${errorHighlight.email && "text-red-500"}`}
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className={`${errorHighlight.email && "!border-red-500"}`}
                />
              </div>{" "}
            </>
          )}

*/

/* 

 {isLogin && (
                <Link
                  to={"/forgot"}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-400"
                >
                  forgot password?
                </Link>
              )}
*/
