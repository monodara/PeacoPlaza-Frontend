import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import { AppState, useAppDispatch } from "../../../redux/store";
import { CategoryReadDto } from "../../categories/categoryDto";
import { ProductReadDto } from "../../products/productDto";
import { productsActions } from "../../products/productSlice";
import { useTheme } from "../../../components/contextAPI/ThemeContext";

interface ProductFormProps {
  isEditing: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ isEditing }) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  const token = localStorage.getItem("token");
  const categories: CategoryReadDto[] = useSelector(
    (state: AppState) => state.categories.items
  );
  const selectProduct: ProductReadDto | undefined = useSelector(
    (state: AppState) => state.products.selectedItem
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    inventory: 0,
    weight: 0,
    categoryId: "",
  });

  useEffect(() => {
    if (isEditing && selectProduct) {
      setFormData({
        title: selectProduct.title,
        description: selectProduct.description,
        price: selectProduct.price,
        inventory: selectProduct.inventory,
        weight: selectProduct.weight,
        categoryId: selectProduct.category.id,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: 0,
        inventory: 0,
        weight: 0,
        categoryId: "",
      });
    }
  }, [isEditing, selectProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      categoryId: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    if (isEditing && selectProduct) {
      try {
        const responseUpdate = await dispatch(
          productsActions.updateOne({
            id: selectProduct.id,
            updateDto: formData,
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        console.log(responseUpdate);
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Update failed: " + error);
      }
    } else {
      try {
        const responseCreate = await dispatch(
          productsActions.createOne({
            createDto: formData,
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        console.log(responseCreate);
      } catch (error) {
        console.error("Error creating product:", error);
        alert("Create failed: " + error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-10">
      {isEditing ? <h2>Edit Product</h2> : <h2>New Product</h2>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full h-24"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="inventory"
            className="block text-sm font-medium text-gray-700"
          >
            Inventory:
          </label>
          <input
            type="text"
            id="inventory"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight:
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleCategoryChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{ ...theme.typography.button, borderRadius: 1 }}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
