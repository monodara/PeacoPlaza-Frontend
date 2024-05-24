import React, { ChangeEvent, useState } from "react";
import { useProductList } from "../../products/useProductList";
import Pagination from "../../products/Pagination";
import { useTheme } from "../../theme/ThemeContext";
import { AppState, useAppDispatch } from "../../../app/store";
import { setInputToSearchKey, setOrderBy } from "../../shared/filterSortSlice";
import { productsActions } from "../../products/productSlice";
import Table from "../../shared/Table";
import DeletePopover from "../../shared/DeletePopover";
import { useSelector } from "react-redux";
import { ProductReadDto } from "../../products/productDto";
import { useNavigate } from "react-router-dom";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const { productList, totalPage, page, setPage } = useProductList();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductReadDto | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const searchKeyword: string = useSelector(
    (state: AppState) => state.filterSort.searchKeyword
  );
  const order: string = useSelector(
    (state: AppState) => state.filterSort.orderBy
  );
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputToSearchKey(event.target.value));
  };

  const handleOrderByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrderBy(event.target.value));
  };

  const handleNewButtonClick = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    dispatch(productsActions.resetSelectItem(null));
    navigate("/product_edit");
  };

  const handleEditClick = (itemId: string) => {
    const product = productList.find((p) => p.id === itemId);
    dispatch(productsActions.fetchById({ id: itemId }));
    setSelectedProduct(product || null);
    setIsEditing(true);
    navigate("/product_edit");
  };

  const handleDeleteClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleDeleteCancel = () => {
    setSelectedItemId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedItemId) {
      dispatch(
        productsActions.deleteOne({
          id: selectedItemId,
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      setSelectedItemId(null);
    }
  };
  const handleRowClick = (itemId: string) => {
    setSelectedItemId(itemId);
    dispatch(
      productsActions.fetchById({
        id: itemId,
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  };

  return (
    <div>
      <h3 className="font-bold text-2xl mb-10" style={{ color }}>
        Product Management
      </h3>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
            className="px-3 py-2 ml-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <span className="px-3">Order by Price</span>
          <select
            value={order}
            onChange={handleOrderByChange}
            className="py-2 border border-gray-300
 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
        <button
          onClick={handleNewButtonClick}
          style={theme.typography.button}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          New
        </button>
      </div>
      {productList && (
        <>
          <Table
            dataList={productList}
            fields={["title", "price", "inventory", "weight"]}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onRowClick={handleRowClick}
          />
          <DeletePopover
            open={!!selectedItemId}
            onClose={handleDeleteCancel}
            onConfirmDelete={handleDeleteConfirm}
          />
        </>
      )}

      <div className="mt-4 flex justify-center">
        <Pagination count={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ProductManagement;
