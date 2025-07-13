import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function FilterPanel({ data, setFilteredData, onApplyFilters }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [school, setSchool] = useState("");
  const [session, setSession] = useState("");
  const [year, setYear] = useState("");

  const schoolOptions = [...new Set(data.map((d) => d.school))];
  const yearOptions = [
    ...new Set(data.map((d) => new Date(d.date).getFullYear())),
  ];

  const handleReset = () => {
    setDateRange([null, null]);
    setSchool("");
    setSession("");
    setYear("");
    onApplyFilters({});
  };

  return (
    <div className="text-white px-4 py-3 max-w-full overflow-hidden">
      {/* Mobile View - Dropdown */}
      <div className="block md:hidden max-w-full">
        <Disclosure>
          {({ open }) => (
            <div className="max-w-full">
              <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 bg-[#1f2937] text-sm font-medium rounded-md hover:bg-[#374151] max-w-full">
                Add Filters
                <ChevronDownIcon
                  className={`w-5 h-5 text-white transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-full overflow-hidden px-1">
                <FilterControls />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Desktop View - Navbar Style */}
      <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 md:justify-center mt-2">
        <FilterControls />
      </div>
    </div>
  );

  function FilterControls() {
    return (
      <>
        {/* Date Range */}
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          placeholderText="Date Range"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          isClearable
          className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full"
        />

        {/* School */}
        <div className="w-full sm:w-[150px] max-w-full overflow-hidden">
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full truncate"
          >
            <option value="">School</option>
            {schoolOptions.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Session */}
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full sm:w-[140px]"
        >
          <option value="">Session</option>
          <option value="Jan - June">Jan - June</option>
          <option value="July - Dec">July - Dec</option>
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full sm:w-[100px]"
        >
          <option value="">Year</option>
          {yearOptions.map((y, i) => (
            <option key={i} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Apply Button */}
        <button
          onClick={() =>
            onApplyFilters({
              startDate,
              endDate,
              schoolName: school,
              session,
              year,
            })
          }
          className="bg-blue-600 hover:bg-blue-700 px-4 py-1 text-sm rounded-lg w-full sm:w-auto"
        >
          Apply
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 text-sm rounded-lg w-full sm:w-auto mt-1 sm:mt-0"
        >
          Reset
        </button>
      </>
    );
  }
}
