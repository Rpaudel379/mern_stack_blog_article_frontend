import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import moment from "moment";

import useDisplayBlog from "@hooks/useDisplayBlog";

const Blog = () => {
  const { userId, loading, error, blog, handleDelete } = useDisplayBlog();

  return (
    <div>
      {loading ? (
        <>
          <p className="flex min-h-[85vh] items-center justify-center text-4xl text-slate-700 dark:text-slate-200">
            loading
          </p>
        </>
      ) : (
        <>
          {error.length ? (
            <>
              <p className="flex min-h-[85vh] items-center justify-center text-4xl text-slate-700 dark:text-slate-200">
                {error}
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto px-4 pb-12 sm:px-6 lg:px-8 lg:pt-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex w-full gap-x-5 sm:items-center sm:gap-x-3">
                    <div className="grow">
                      <div className="grid gap-2 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="hs-tooltip inline-block [--placement:bottom] [--trigger:hover]">
                            <div className="hs-tooltip-toggle block cursor-pointer text-left sm:mb-1">
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                By {blog?.userId.username}
                              </span>
                            </div>
                          </div>

                          <ul className="text-xs text-gray-500">
                            <li className="relative inline-block pr-6 before:absolute before:right-2 before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 last:pr-0 last-of-type:before:hidden dark:text-gray-400 dark:before:bg-gray-600">
                              {moment(
                                new Date(blog?.createdAt as string)
                              ).fromNow()}
                            </li>
                          </ul>
                        </div>

                        {userId === blog?.userId._id && (
                          <div className="mt-5 space-x-4 sm:mt-0">
                            <Link
                              to={`/blog/edit/${blog?._id}`}
                              className="inline-flex items-center justify-center gap-x-1.5 rounded-md border bg-white px-2.5 py-1.5 align-middle text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white  sm:gap-x-2 sm:px-3 sm:py-2 sm:text-sm"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                              Edit
                            </Link>

                            <button
                              onClick={handleDelete}
                              className="inline-flex items-center justify-center gap-x-1.5 rounded-md border bg-white px-2.5 py-1.5 align-middle text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white  sm:gap-x-2 sm:px-3 sm:py-2 sm:text-sm"
                            >
                              <TrashIcon className="h-5 w-5 text-red-500" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-20 text-black">
                  <div
                    className="prose min-w-full dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html: blog?.content as string,
                    }}
                  >
                    {/* {blog?.content} */}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
