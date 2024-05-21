import { useState, useMemo } from "react";

const useSearch = (data, searchField, ratingFilter) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (item) =>
        item[searchField].toLowerCase().includes(searchQuery.toLowerCase()) &&
        item.averageRating >= ratingFilter
    );
  }, [data, searchQuery, searchField, ratingFilter]);

  return { searchQuery, setSearchQuery, filteredData };
};

export default useSearch;
