"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import UploadSingleImg from "./UploadSingleImg"; // Assuming this component handles file selection and sets `image`
import { toast } from "sonner";
import { createProduct } from "@/api/productApi";

interface NewProduct {
  name: string;
  price: number;
  description: string;
  quantity: number;
  seller: string;
  ratings: number;
}

const TourDetailsArea = () => {
  const adminId = "671596e1650cad1f372063b1"; // Replace with actual advertiser ID
  const [product, setProduct] = useState<NewProduct>({
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    seller: adminId,
    ratings: 0,
  });

  const [image, setImage] = useState<File | null>(null); // State for the selected image file

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]); // Set the selected file
    }
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", String(product.price));
    formData.append("description", product.description);
    formData.append("quantity", String(product.quantity));
    formData.append("seller", adminId);

    if (image) {
      formData.append("file", image); // Append the image file to formData
    }

    try {
      console.log(formData);
      const response = await createProduct(formData); // Make sure createProduct accepts FormData
      toast.success(response.message || "Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <>
      <section className="bd-product-details-area section-space">
        <form onSubmit={handleAddProduct}>
          <div className="container">
            <div className="row gy-24 justify-content-center">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="product-details-wrapper">
                  <div className="product-details mb-25">
                    {/* Image Upload */}
                    <div className="form-input-box mb-15">
                      <div className="form-input-title">
                        <label htmlFor="file">Product Image <span></span></label>
                      </div>
                      <div className="form-input">
                        <input type="file" name="file" onChange={handleFileChange}  />
                      </div>
                    </div>
                    <div className="form-input-box mb-15">
                      <div className="form-input-title">
                        <label htmlFor="productName">
                          Product Name <span>*</span>
                        </label>
                      </div>
                      <div className="form-input">
                        <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="product-details-content">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-input-box">
                            <div className="form-input-title">
                              <label htmlFor="price">
                                Price <span>*</span>
                              </label>
                            </div>
                            <div className="form-input">
                              <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-input-box">
                            <div className="form-input-title">
                              <label htmlFor="quantity">
                                Quantity <span>*</span>
                              </label>
                            </div>
                            <div className="form-input">
                              <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-input-box mb-35">
                        <div className="form-input-title">
                          <label htmlFor="description">
                            Description <span>*</span>
                          </label>
                        </div>
                        <div className="form-input">
                          <textarea
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-edit-btn text-start">
                <button type="submit" className="bd-primary-btn btn-style radius-60" style={{marginLeft: "20px"}}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default TourDetailsArea;