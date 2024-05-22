import { useState, useMemo } from "react";

const useSearch = (data, searchKey, ratingFilter) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result = data;

    if (searchQuery) {
      result = result.filter((item) =>
        item[searchKey].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (ratingFilter > 0) {
      result = result.filter((item) => item.averageRating >= ratingFilter);
    }

    return result;
  }, [data, searchQuery, ratingFilter, searchKey]);

  return { searchQuery, setSearchQuery, filteredData };
};

export default useSearch;
