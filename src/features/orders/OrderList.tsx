import React, { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { AppState, useAppDispatch } from "../../app/store";
import { ordersActions } from "./orderSlice";
import { OrderReadDto } from "./orderDto";
import { useSelector } from "react-redux";
import Table from "../shared/Table";
import Pagination from "../products/Pagination";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [totalPage, setTotalPage] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const [page, setPage] = useState(1);
  const pageSize = 12;
  let filterProductsUrlSuffix = "";
  let sortPaginateProductsUrlSuffix = filterProductsUrlSuffix;
  sortPaginateProductsUrlSuffix +=
    sortPaginateProductsUrlSuffix === ""
      ? `?pageNo=${page}&pageSize=${pageSize}`
      : `&pageNo=${page}&pageSize=${pageSize}`;

  async function fetchTotalAddressCount() {
    try {
      const response = await dispatch(
        ordersActions.fetchTotalCount({
          urlSuffix: `${filterProductsUrlSuffix}`,
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      const data = response.payload as number;
      console.log(data);
      setTotalPage(Math.ceil(data / pageSize));
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  }
  useEffect(() => {
    fetchTotalAddressCount();
    dispatch(
      ordersActions.fetchAll({
        urlSuffix: `${sortPaginateProductsUrlSuffix}`,
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  }, [page, dispatch]);
  const orderList: OrderReadDto[] = useSelector(
    (state: AppState) => state.orders.items
  );
  const handleDeleteClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };
  const handleEditClick = (itemId: string) => {
    // setSelectedItemId(itemId);
    alert("Sorry, this operation is not allowed.");
  };
  const handleRowClick = async (itemId: string) => {
    setSelectedItemId(itemId);
    try {
      var response = await dispatch(
        ordersActions.fetchById({
          id: itemId,
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      var order = response.payload as OrderReadDto;
      console.log(response.payload);

      navigate("/order_detail");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={{ color: textPrimaryColor }}>
      <div>
        <Table
          dataList={orderList}
          fields={["id", "orderDate", "status", "dateOfDelivery"]}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          onRowClick={handleRowClick}
        />
        <div className="mt-4 flex justify-center">
          <Pagination count={totalPage} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}
