import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
    imageName: "",
    imageType: "",
  });

  // Fetch product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        const productData = response.data;
// console.log();
        // Set state with full product
        setUpdateProduct({
          id: productData.id,
          name: productData.name || "",
          description: productData.description || "",
          brand: productData.brand || "",
          price: productData.price || "",
          category: productData.category?.trim().toLowerCase() || "",
          releaseDate: productData.releaseDate || "",
          productAvailable: productData.productAvailable || false,
          stockQuantity: productData.stockQuantity || "",
          imageName: productData.imageName || "",
          imageType: productData.imageType || "",
        });

        // Load image separately
        if (productData.imageName) {
          const imageResponse = await axios.get(
            `http://localhost:8080/api/product/${id}/image`,
            { responseType: "blob" }
          );
          const file = new File([imageResponse.data], productData.imageName, {
            type: imageResponse.data.type,
          });
          setImage(file);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Generate preview URL when image changes
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (image) {
        formData.append("imageFile", image);
      }

      formData.append(
        "product",
        new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
      );

      await axios.put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // Handle text/number/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox separately
  const handleCheckboxChange = (e) => {
    setUpdateProduct((prev) => ({
      ...prev,
      productAvailable: e.target.checked,
    }));
  };

  // Handle file input
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "7rem" }}>
        <h1>Update Product</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.brand}
              onChange={handleChange}
              name="brand"
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.description}
              onChange={handleChange}
              name="description"
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              value={updateProduct.price}
              onChange={handleChange}
              name="price"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={updateProduct.category              }
              onChange={handleChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="laptop">Laptop</option>
              <option value="headphone">Headphone</option>
              <option value="mobile">Mobile</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              value={updateProduct.stockQuantity}
              onChange={handleChange}
              name="stockQuantity"
            />
          </div>

          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt={updateProduct.imageName}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  padding: "5px",
                  margin: "0",
                }}
              />
            )}
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              name="imageFile"
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                checked={updateProduct.productAvailable}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
