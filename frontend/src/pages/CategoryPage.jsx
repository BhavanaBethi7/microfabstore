// src/pages/CategoryPage.jsx
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const categories = [
    { name: "Substrates & Wafers", slug: "substrates-wafers" },
    { name: "Metals & Components", slug: "metals-components" },
    { name: "Chemicals & Process Materials", slug: "chemicals-process-materials" },
    { name: "Cleanroom & Safety Gear", slug: "cleanroom-safety-gear" },
  ];

  return (
    <>
      <Navbar />
      <div className="page-content page-transition">
        <h1 className="page-title">Browse Categories</h1>

        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="category-card"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
