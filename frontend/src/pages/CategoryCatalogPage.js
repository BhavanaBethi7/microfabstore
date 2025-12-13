import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCatalogPage.css";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/NavBar";
import { categories } from "../data/categories";

const CategoryCatalogPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // ✅ Adjust this based on your route in App.js
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      <Navbar />
      <div className="category-page">
        <ImageSlider />
        <h1 className="title">Explore Semiconductor Categories</h1>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <div
              className="category-card"
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="image-wrapper">
                <img src={cat.img} alt={cat.name} />
              </div>
              <h2>{cat.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryCatalogPage;
