// src/components/CategoryCard.js
import React from "react";
import { getImageUrl } from "../utils/image";
const CategoryCard = ({ image, title, onViewMore }) => {
  // ✅ Build full image URL safely
  <img
  src={getImageUrl(image)}
  alt={title}
  onError={(e) => (e.currentTarget.src = "/placeholder.png")}
/>
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4">
      <img
  src={getImageUrl(image)}
  alt={title}
  className="w-64 h-40 object-cover rounded-md mb-4"
/>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <button
        onClick={onViewMore}
        className="bg-blue-600 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition duration-200"
      >
        View More
      </button>
    </div>
  );
};

export default CategoryCard;
