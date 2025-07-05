import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function FilterPanel({ data, setFilteredData }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [school, setSchool] = useState("");
  const [session, setSession] = useState("");
  const [year, setYear] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [search, setSearch] = useState("");

  const schoolOptions = [...new Set(data.map((d) => d.school))];
  const yearOptions = [...new Set(data.map((d) => new Date(d.date).getFullYear()))];

  useEffect(() => {
    let filtered = data;

    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const d = new Date(item.date);
        return d >= startDate && d <= endDate;
      });
    }

    if (school) filtered = filtered.filter((item) => item.school === school);
    if (session) filtered = filtered.filter((item) => item.session === session);
    if (year) filtered = filtered.filter((item) => new Date(item.date).getFullYear().toString() === year);
    if (ageGroup) {
      filtered = filtered.filter((item) => {
        const age = item.age;
        if (ageGroup === "<10") return age < 10;
        if (ageGroup === "10–14") return age >= 10 && age <= 14;
        if (ageGroup === "15–18") return age >= 15 && age <= 18;
        if (ageGroup === "18+") return age > 18;
        return true;
      });
    }

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [startDate, endDate, school, session, year, ageGroup, search]);

  const handleReset = () => {
    setDateRange([null, null]);
    setSchool("");
    setSession("");
    setYear("");
    setAgeGroup("");
    setSearch("");
    setFilteredData(data);
  };

  return (
    <div className=" text-white px-4 py-3">
      {/* Mobile View - Dropdown */}
      <div className="block md:hidden">
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 bg-[#1f2937] text-sm font-medium rounded-md hover:bg-[#374151]">
                Add Filters
                <ChevronDownIcon
                  className={`w-5 h-5 text-white transition-transform ${open ? "rotate-180" : ""}`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FilterControls />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Desktop View - Navbar Style */}
      <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 md:justify-start mt-2">
        <FilterControls />
      </div>
    </div>
  );

  function FilterControls() {
    return (
      <>
        {/* Date Range */}
        <div className="w-full sm:w-auto">
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
        </div>

        {/* School */}
        <select
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full sm:w-[150px]"
        >
          <option value="">School</option>
          {schoolOptions.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

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
            <option key={i} value={y}>{y}</option>
          ))}
        </select>

        {/* Age Group 
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full sm:w-[100px]"
        >
          <option value="">Age</option>
          <option value="<10">&lt;10</option>
          <option value="10–14">10–14</option>
          <option value="15–18">15–18</option>
          <option value="18+">18+</option>
        </select> */}

        {/* Search 
        <input
          type="text"
          placeholder="Search Name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1f2937] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-full sm:w-[160px]"
        /> */}

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
