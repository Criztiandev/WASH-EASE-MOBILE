import { useState, useMemo } from "react";

const useSearch = (data, searchField) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item[searchField].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery, searchField]);

  return { searchQuery, setSearchQuery, filteredData };
};

export default useSearch;
