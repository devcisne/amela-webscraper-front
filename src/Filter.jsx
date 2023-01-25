import React, { useEffect, useState } from "react";

const Filter = ({ companies, setFilteredList }) => {
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTextFilterChange = (event) => {
    setFilterText(event.target.value);
    let filteredList = companies.filter((company) =>
      company.company.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredList(filteredList);
  };

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let isStartDateValid = start instanceof Date && !isNaN(start.getTime());
    let isEndDateValid = end instanceof Date && !isNaN(end.getTime());

    if (isStartDateValid && isEndDateValid) {
      let filteredList = companies.filter((company) => {
        const companyDate = new Date(company.createdAt);
        return start <= companyDate && companyDate <= end;
      });
      setFilteredList(filteredList);
    } else {
      if (isStartDateValid) {
        let filteredList = companies.filter((company) => {
          const companyDate = new Date(company.createdAt);
          return start <= companyDate;
        });
        setFilteredList(filteredList);
      }
      if (isEndDateValid) {
        let filteredList = companies.filter((company) => {
          const companyDate = new Date(company.createdAt);
          return companyDate <= end;
        });

        setFilteredList(filteredList);
      }
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="flex flex-row mx-2 py-3 gap-2">
        <p className="px-2 py-1">Filters</p>
        <div className="flex flex-col">
          <label>
            <p>Name:</p>
            <input
              className="bg-white border border-gray-400 rounded-lg px-2 py-1 placeholder-gray-500 focus:outline-none focus:shadow-outline text-gray-700 font-medium"
              type="text"
              value={filterText}
              onChange={handleTextFilterChange}
              placeholder="Filter list by name"
            />
          </label>
        </div>

        <label>
          Start Date:
          <input
            value={startDate}
            onChange={handleStartDateChange}
            type="date"
            className="bg-white border border-gray-400 rounded-lg px-2 py-1 placeholder-gray-500 focus:outline-none focus:shadow-outline text-gray-700 font-medium w-full"
          />
        </label>
        <label>
          End Date:
          <input
            value={endDate}
            onChange={handleEndDateChange}
            type="date"
            className="bg-white border border-gray-400 rounded-lg px-2 py-1 placeholder-gray-500 focus:outline-none focus:shadow-outline text-gray-700 font-medium w-full"
          />
        </label>
      </div>
    </>
  );
};

export default Filter;
