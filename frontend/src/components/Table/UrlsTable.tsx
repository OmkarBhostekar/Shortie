import { useEffect } from "react";
import TableRow from "./TableRow";
import { User } from "../../utils/types/User";
import { useAppContext } from "../../utils/hooks/useAppContext";

type Props = {
  user: User | null;
  onDelete: (id: string) => void;
  onQr: (url: string) => void;
};

const UrlsTable = ({ user, onDelete, onQr }: Props) => {
  const { urls, fetchUrls } = useAppContext();

  useEffect(() => {
    fetchUrls(user?.id as string);
  }, []);

  return (
    <div className="mt-10 md:mx-12">
      {urls.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-[#C9CED6] font-semibold bg-[#0D1117] ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Short Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Original Link
                </th>
                <th scope="col" className="px-6 py-3  text-center">
                  QR Code
                </th>
                <th scope="col" className="px-6 py-3  text-center">
                  Clicks
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => {
                return <TableRow url={url} onDelete={onDelete} onQr={onQr} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-full w-full flex mt-12 items-center justify-center">
          <h1 className="text-2xl font-semibold text-[#144EE3] ">
            No URL Shortened Yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default UrlsTable;
