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
        if (item.shops_rating.length === 0) return false; // No ratings, skip the shop
        const averageRating =
          item.shops_rating.reduce((sum, rating) => sum + rating, 0) /
          item.shops_rating.length;
        return averageRating >= ratingFilter;
      });
    }

    setFilteredData(result);
  }, [data, searchKey, searchQuery, ratingFilter]);

  return { searchQuery, setSearchQuery, filteredData };
};

export default useCombinedFilter;
