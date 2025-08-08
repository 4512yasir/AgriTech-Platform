import React, { useEffect, useState } from "react";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading products...</p>;

  return (
    <div style={{ display: "flex" }}>
     
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Available Products</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  background: "white",
                }}
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/200"}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
                />
                <h3 style={{ color: "#2E7D32", marginTop: "10px" }}>{product.name}</h3>
                <p style={{ fontWeight: "bold" }}>Price: ${product.price}</p>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
