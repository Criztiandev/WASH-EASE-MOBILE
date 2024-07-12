import { useState, useEffect } from "react";

const useCombinedFilter = (data, searchKey, ratingFilter) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let result = data;

    // Apply search filter
    if (searchQuery) {
      result = result.filter((item) =>
        item[searchKey].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply rating filter
    if (ratingFilter > 0) {
      result = result.filter((item) => {
        return ratingFilter === item.avarageRating;
      });
    }

    setFilteredData(result);
  }, [data, searchKey, searchQuery, ratingFilter]);

  return { searchQuery, setSearchQuery, filteredData };
};

export default useCombinedFilter;
