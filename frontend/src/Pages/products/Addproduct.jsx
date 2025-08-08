// src/Pages/Farmer/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [image_url, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/listings/",
        {
          title,
          description,
          category,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          location,
          image_url,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product listed successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setLocation("");
      setImageUrl("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to list product");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input placeholder="Image URL" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
