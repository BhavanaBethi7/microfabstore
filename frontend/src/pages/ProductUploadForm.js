import React, { useState } from "react";
import axios from "axios";
import "./ProductUploadForm.css";

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    inStock: true,
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/products/addWithImage", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`✅ Product added: ${res.data.name}`);
      setFormData({ name: "", category: "", description: "", price: "", inStock: true });
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Add Product</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <select name="inStock" value={formData.inStock} onChange={handleChange}>
          <option value={true}>In Stock</option>
          <option value={false}>Out of Stock</option>
        </select>
        <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Add Product"}</button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default ProductUploadForm;
