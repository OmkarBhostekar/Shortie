import { useEffect } from "react";
import TableRow from "./TableRow";
import { User } from "../../utils/types/User";
import { useAppContext } from "../../utils/hooks/useAppContext";

type Props = {
  user: User | null;
};

const UrlsTable = ({ user }: Props) => {
  const { urls, fetchUrls } = useAppContext();

  useEffect(() => {
    fetchUrls(user?.id as string);
  }, []);

  return (
    <div className="mt-10 md:mx-12">
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
              return <TableRow url={url} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlsTable;
