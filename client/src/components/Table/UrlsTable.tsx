import React from "react";
import TableRow from "./TableRow";
import { Url } from "@/types/Url";

type Props = {};

const UrlsTable = (props: Props) => {
  const urls: Url[] = [
    {
      shortUrl: "https://shortie.com/Bn41aCOlnxj",
      longUrl: "https://www.google.com",
      clicks: 1223,
      isActive: true,
      createdAt: "2023-06-24T15:00:00.000Z",
    },
    {
      shortUrl: "https://shortie.com/BncdaCOlnxj",
      longUrl: "https://codeforces.com/profile/omkarbhostekar",
      clicks: 998,
      isActive: true,
      createdAt: "2022-12-21T15:00:00.000Z",
    },
    {
      shortUrl: "https://shortie.com/An21aCOlnxj",
      longUrl: "https://leetcode.com/omkarbhostekar/",
      clicks: 726,
      isActive: true,
      createdAt: "2022-12-10T15:00:00.000Z",
    },
    {
      shortUrl: "https://shortie.com/Bn41aCOlnxj",
      longUrl: "https://www.linkedin.com/in/omkar-bhostekar",
      clicks: 267,
      isActive: true,
      createdAt: "2022-08-21T15:00:00.000Z",
    },
    {
      shortUrl: "https://shortie.com/Bn41aCOvcd",
      longUrl: "https://www.twitter.com",
      clicks: 23,
      isActive: false,
      createdAt: "2022-05-25T15:00:00.000Z",
    },
    {
      shortUrl: "https://shortie.com/Bn41aCOvcd",
      longUrl: "https://www.facebook.com",
      clicks: 0,
      isActive: false,
      createdAt: "2021-06-02T15:00:00.000Z",
    },
  ];

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
