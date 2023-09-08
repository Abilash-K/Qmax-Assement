import React, { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({search,data}) => {
  const [inputSearch, setInputSearch] = useState(JSON.parse(localStorage.getItem("inputSearch")) || "");;
  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("inputSearch", JSON.stringify(inputSearch));
  }, [inputSearch]);
  const userValue = (e) => {
    const userinput = e.target.value;
    setInputSearch(userinput)
    const searchResult = FuzzySearch(userinput,data)
    search(searchResult)
  };
  // FuzzySearch
  const FuzzySearch = (query, data) => {
    query = query.toLowerCase();
    return data.filter(item => {
      const title = item.title ? item.title.toLowerCase() : '';

      
      // Check if the query matches in either title or body
      if (title.includes(query)) {
        return true;
      }
      
      return false;
    });
  };


  
  return (
    <div style={{ margin: "10px" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={inputSearch}
        onChange={userValue}
        InputProps={{
          endAdornment: (
            <SearchIcon
              style={{ cursor: 'pointer' }}
            />
          ),
        }}
      />
    </div>
  );
};

export default SearchBox;
