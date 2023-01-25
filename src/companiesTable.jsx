import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import HTMLReactParser from "html-react-parser";
import Filter from "./Filter";

const CompaniesTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      return await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_ENDPOINT}/api/companies`,
      });
    };
    fetchData()
      .then((response) => {
        // console.log("response", response.headers)
        if (response.status === 200) {
          // console.log("Request was successfull.");
          setCompanies(response.data);
          setFilteredList(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(`Request failed. error:`, error);
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Companies</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of information for companies product of web scraping
            https://www.descubre.vc/
          </p>
        </div>
      </div>

      <Filter companies={companies} setFilteredList={setFilteredList} />
      {!isLoading ? (
        <>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          <p className="text-center">Company</p>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <p className="text-center"> $$$ Amount</p>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <p className="text-center"> Information links</p>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <p className="text-center"> Content</p>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <p className="text-center"> Updated on</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {filteredList.map((company, i) => (
                        <tr
                          key={company._id}
                          className={i % 2 === 0 ? undefined : "bg-gray-50"}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {company.company}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {company.amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {company.links.length > 0
                              ? company.links.map((link, i) => (
                                  <>
                                    <a href={link}>{link}</a>
                                    <br />
                                  </>
                                ))
                              : "not available at time of update, check www.descubre.vc or wait for next update"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {company.content
                              ? HTMLReactParser(company.content)
                              : "not available at time of update, check www.descubre.vc or wait for next update"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {`${new Date(company.createdAt).toUTCString()}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CgSpinner className="animate-spin text-9xl mx-auto" />
      )}
    </div>
  );
};

export default CompaniesTable;
