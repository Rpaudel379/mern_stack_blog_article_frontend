
type Props = {
  generatePageNumbers: number[];
  setSearchParams: (query: string) => void;
  pageNo: number;
};

const Pagination = ({
  generatePageNumbers,
  setSearchParams,
  pageNo,
}: Props) => {
  return (
    <div className=" flex items-center justify-center space-x-2 ">
      {generatePageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          className={`${
            page === (pageNo as number)
              ? "bg-blue-500 text-white"
              : "text-gray-500 hover:text-blue-600"
          }  inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium`}
          onClick={() => {
            setSearchParams(`page=${page}`);
          }}
          disabled={page === (pageNo as number)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
