import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, findUser, getAllUsers } from "../../redux/apiCalls";
import Swal from "sweetalert2";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);

    const [data, setData] = useState(users);
    const handleDelete = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(id, dispatch);
          window.location.reload();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    };

    const columns = [
      { field: "_id", headerName: "ID", width: 140 },
      {
        field: "users",
        headerName: "Customer",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="userListItem">
              <img className="userListImg" src={params.row.picture ? params.row.picture : `https://i.pravatar.cc/150?u=${params.row.email}`} alt="" />
              {params.row.username}
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 180 },
      {
        field: "password",
        headerName: "PassWord",
        width: 180,
      },
      {
        field: "isAdmin",
        headerName: "Is Admin",
        width: 135,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link  to={"/user/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div style={{flex:4, height: "90vh",width: "100%"}}>
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
        />
      </div>
  );
}
