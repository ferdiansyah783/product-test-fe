import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tier, setTier] = useState("");
  const [productCategory, setProductCategory] = useState("");

  // Mengambil produk dari API saat pertama kali komponen dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products", {
        params: {
          name: keyword,
          tier: tier,
          category: productCategory,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fungsi untuk memproses pencarian
  const handleSearch = () => {
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Form untuk mencari produk */}
      <div className="flex flex-col gap-4 mb-6">
        <TextField
          label="Search Products"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
        />
        <TextField
          label="Tier"
          variant="outlined"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          fullWidth
        />
        <TextField
          label="Product Category"
          variant="outlined"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Menampilkan daftar produk */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-white shadow-lg">
              <CardContent>
                <Typography variant="h6" className="font-bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.product_category}
                </Typography>
                <Typography variant="body2" className="mt-2">
                  {product.description}
                </Typography>

                <div className="mt-4">
                  <Typography variant="body1" className="font-bold mb-2">
                    Price List:
                  </Typography>
                  {product.prices.map((price) => (
                    <div key={price.id} className="mt-4">
                      <Typography variant="body2" className="text-blue-700">
                        Unit: {price.unit}
                      </Typography>
                      {price.price_details.map((detail) => (
                        <Typography key={detail.id} variant="body2">
                          {detail.tier}: Rp{detail.price}
                        </Typography>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="h6" className="text-center mt-4">
          No products found.
        </Typography>
      )}
    </div>
  );
};

export default ProductList;
