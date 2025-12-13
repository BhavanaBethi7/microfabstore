import React, { useState } from "react";

const AdminUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/api/products/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.imageUrl);
  };

  return (
    <div className="upload-container" style={{ textAlign: "center", marginTop: 20 }}>
      <h2>Upload Product Image</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit">Upload</button>
      </form>

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <h4>Uploaded Image:</h4>
          <img src={imageUrl} alt="Uploaded" width="200" />
          <p>{imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
