import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) =>
    data.append(key, value)
  );
  data.append("image", image);

  await axios.post(`${API_URL}/api/products/add`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  alert("✅ Product uploaded");
};
