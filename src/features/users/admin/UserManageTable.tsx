import React, { useState, useEffect, ChangeEvent } from 'react';
import Table from "../../shared/Table";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../userSlice";
import { AppState, useAppDispatch } from "../../../redux/store";
import DeletePopover from "../../../components/DeletePopover";
import { UserReadDto } from '../userDto';
import { useTheme } from '../../../components/contextAPI/ThemeContext';
import { buttonStyle } from '../../../misc/style';
import { setInputToSearchKey, setOrderBy } from '../../shared/filterSortSlice';
import Pagination from '../../products/Pagination';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const userList: UserReadDto[] = useSelector((state: AppState) => state.users.items);
  const token = localStorage.getItem("token");
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  let filterProductsUrlSuffix = "";
  const searchKeyword: string = useSelector(
      (state: AppState) => state.filterSort.searchKeyword
    );
  const order: string = useSelector(
      (state: AppState) => state.filterSort.orderBy
    );
  
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  if(searchKeyword && searchKeyword.trim() !== ""){
    filterProductsUrlSuffix += `?searchKey=${searchKeyword}`;
  }
  async function fetchTotalProductCount() {
      try {
        const response = await dispatch(usersActions.fetchTotalCount({urlSuffix: `${filterProductsUrlSuffix}`, headers: { Authorization: `Bearer ${token}` } }));
        const data = response.payload as number;
        setTotalPage(Math.ceil(data/pageSize));
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    }
  let sortPaginateProductsUrlSuffix = filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?pageNo=${page}&pageSize=${pageSize}` :`&pageNo=${page}&pageSize=${pageSize}`;
  if(order !== "") sortPaginateProductsUrlSuffix += sortPaginateProductsUrlSuffix === "" ? `?sortBy=byDate&orderBy=${order}` :`&sortBy=byDate&orderBy=${order}`;
  useEffect(() => {
    fetchTotalProductCount();
    dispatch(usersActions.fetchAll({urlSuffix: `${sortPaginateProductsUrlSuffix}`,headers: { Authorization: `Bearer ${token}` } }));
  }, [searchKeyword, page, order]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputToSearchKey(event.target.value))
  };

  const handleOrderByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrderBy(event.target.value));
  };

  const handleNewButtonClick = () => {
    navigate("/register")
  };

  const handleDeleteClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };
  const handleEditClick = (itemId: string) => {
    // setSelectedItemId(itemId);
    alert("Sorry, this operation is not allowed.");
  };

  const handleDeleteCancel = () => {
    setSelectedItemId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedItemId) {
      dispatch(usersActions.deleteOne({ id: selectedItemId,headers: { Authorization: `Bearer ${token}` } }));
      setSelectedItemId(null);
    }
  };

  return (
    <div>
      <h3 className="font-bold text-2xl mb-10" style={{ color }}>User Management</h3>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
            className="px-3 py-2 ml-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <span className="px-3">Order by Joined Date</span>
          <select
            value={order}
            onChange={handleOrderByChange}
            className="py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="Ascending"> Ascending</option>
            <option value="Descending"> Descending</option>
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
      {userList && (
        <>
          <Table
            dataList={userList}
            fields={["userName", "email", "role", "joinedAt"]}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
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
}
