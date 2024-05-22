import { useState, useEffect } from "react";

const useRatingFilter = (shops, rating) => {
  const [filteredShops, setFilteredShops] = useState([]);

  useEffect(() => {
    const filtered = shops.filter((shop) => {
      // Assuming `shops_rating` is an array of numbers
      if (shop.shops_rating.length === 0) return false; // No ratings, skip the shop
      const averageRating =
        shop.shops_rating.reduce((sum, rating) => sum + rating, 0) /
        shop.shops_rating.length;
      return averageRating >= rating;
    });
    setFilteredShops(filtered);
  }, [shops, rating]);

  return filteredShops;
};

export default useRatingFilter;
