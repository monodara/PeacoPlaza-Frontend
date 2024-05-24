import React, { useEffect, useState } from "react";
import { AppState, useAppDispatch } from "../../app/store";
import { addressesActions } from "./addressSlice";
import { AddressReadDto } from "./addressDto";
import { useSelector } from "react-redux";
import Table from "../shared/Table";
import Pagination from "../products/Pagination";

export default function AddressList() {
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
        addressesActions.fetchTotalCount({
          urlSuffix: `${filterProductsUrlSuffix}`,
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      const data = response.payload as number;
      setTotalPage(Math.ceil(data / pageSize));
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  }
  useEffect(() => {
    fetchTotalAddressCount();
    dispatch(
      addressesActions.fetchAll({
        urlSuffix: `${sortPaginateProductsUrlSuffix}`,
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  }, [page, dispatch]);
  const addressList: AddressReadDto[] = useSelector(
    (state: AppState) => state.addresses.items
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
        addressesActions.fetchById({
          id: itemId,
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      var address = response.payload as AddressReadDto;

      alert(
        `Select address: ${address.addressLine} ${address.street} ${address.city}`
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Table
        dataList={addressList}
        fields={[
          "firstName",
          "phoneNumber",
          "addressLine",
          "street",
          "city",
          "country",
        ]}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onRowClick={handleRowClick}
      />
      <div className="mt-4 flex justify-center">
        <Pagination count={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
