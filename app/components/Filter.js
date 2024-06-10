// components/Filter.js
"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

function Filter({ setFilteredData }) {
  const [naicsCode, setNaicsCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = async () => {
    let query = supabase.from("opportunities").select("*");

    if (naicsCode) {
      query = query.eq("naics_code", naicsCode);
    }

    if (searchTerm) {
      query = query.textSearch("description", searchTerm);
    }

    const { data } = await query;
    setFilteredData(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="NAICS Code"
        value={naicsCode}
        onChange={(e) => setNaicsCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search IT Terms"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
}

export default Filter;
