// pages/search.js
"use client";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch-dom";
import { useState, useEffect } from "react";
import codesHandler from "../utils/naicsCodes";
import { TextField, MenuItem, IconButton, InputAdornment } from '@mui/material';

// Initialize Algolia search client
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

function Search() {
  const [naicsCode, setNaicsCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [naicsCodes, setNaicsCodes] = useState([]);

  useEffect(() => {
    async function fetchNaicsCodes() {
      const response = await codesHandler();
      console.log(response);
      setNaicsCodes(response);
    }
    fetchNaicsCodes();
  }, []);

  const handleClearNaicsCode = () => {
    setNaicsCode('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Opportunities Search
      </h1>
      <div className="max-w-4xl mx-auto">
        <InstantSearch
          searchClient={searchClient}
          indexName="dev_oppurtunities"
        >
          <div className="mb-6">
            <div className="flex space-x-4">
              <TextField
                select
                label="NAICS Code"
                value={naicsCode}
                onChange={(e) => setNaicsCode(e.target.value)}
                className="w-1/2"
                InputProps={{
                  endAdornment: naicsCode ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearNaicsCode}>
                        <p className="mr-6 mb-1">x</p>
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              >
                {naicsCodes.map((code) => (
                  <MenuItem key={code.naics_code} value={code.naics_code}>
                    {code.naics_code}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Search IT Terms"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>

          <SearchBox className="mb-6" />

          <div className="flex space-x-4 mb-6">
            <div className="w-1/4">
              {/* You can add more refinement lists or other widgets here if needed */}
            </div>
            <div className="w-3/4">
              <Hits hitComponent={Hit} />
            </div>
          </div>
          <Configure
            filters={naicsCode ? `naics_code:${naicsCode}` : ""}
            facetFilters={searchTerm ? [`description:${searchTerm}`] : []}
          />
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <div className="p-4 border rounded mb-4 bg-white">
      <h2 className="text-xl font-semibold text-black">{hit.title}</h2>
      <p className="text-black">{hit.description}</p>
      <p className="text-gray-500">NAICS Code: {hit.naics_code}</p>
    </div>
  );
}

export default Search;
