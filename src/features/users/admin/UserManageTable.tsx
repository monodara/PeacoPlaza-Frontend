import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserReadDto } from "../userDto";
import { AppState, useAppDispatch } from "../../../redux/store";
import { usersActions } from "../userSlice";
import Table from "../../shared/Table";
import DeletePopover from "../../../components/DeletePopover";

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const token = localStorage.getItem("token");
  const userList: UserReadDto[] = useSelector(
    (state: AppState) => state.users.items
  );

  useEffect(() => {
    dispatch(
      usersActions.fetchAll({
        urlSuffix: "",
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  }, [dispatch, selectedItemId]);


  const handleDeleteClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleDeleteCancel = () => {
    setSelectedItemId(null);
  };

  const handleDeleteConfirm = () => {
    console.log(selectedItemId);
    if (selectedItemId) {
      dispatch(usersActions.deleteOne({ id: selectedItemId,headers: { Authorization: `Bearer ${token}` } }));
      setSelectedItemId(null);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {userList && (
        <>
          <Table
            dataList={userList}
            fields={["userName", "email", "role", "joinedAt"]}
            onDeleteClick={handleDeleteClick}
          />
          <DeletePopover
            open={!!selectedItemId}
            onClose={handleDeleteCancel}
            onConfirmDelete={handleDeleteConfirm}
          />
        </>
      )}
    </div>
  );
}
