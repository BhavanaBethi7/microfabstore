// src/components/AdminUpload.jsx
import React, { useState } from "react";
import API from "../services/api";

const AdminUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please select an image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await API.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(res.data.imageUrl);
    } catch (err) {
      setError(
        err.response?.data?.message || "Image upload failed"
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h2>Upload Product Image</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">Upload</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <h4>Uploaded Image</h4>
          <img src={imageUrl} alt="Uploaded" width="200" />
          <p>{imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
