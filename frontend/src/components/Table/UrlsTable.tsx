import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { Url } from "../../utils/types/Url";
import { User } from "../../utils/types/User";
import axios from "axios";

type Props = {
  user: User | null;
};

const UrlsTable = ({ user }: Props) => {
  const [urls, seturls] = useState<Url[]>([]);

  const fetchUrls = async () => {
    const res = await axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls?id=${user?.id}`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    seturls(res);
  };

  useEffect(() => {
    fetchUrls();
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

// static props
export async function getStaticProps() {
  const uid = "649474b992a1dd7ef46c4b88";
  console.log(uid);

  return {
    props: {},
  };
}

export default UrlsTable;
