import "./Orders.module.css";
import { DataGrid } from "@material-ui/data-grid";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOrders, updateOrder } from "../../redux/apiCalls";
import moment from "moment";

export default function Orders() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.list)
    useEffect(() => {
        getListOrders(dispatch);
    }, [dispatch]);

    const handleChange = (e) => {
        updateOrder(e.target.id, { status: e.target.value }, dispatch);
        window.location.reload();

    }
    const columns = [
        { field: "_id", headerName: "ID", width: 120 },
        // {
        //   field: "product",
        //   headerName: "Product",
        //   width: 200,
        //   renderCell: (params) => {
        //     return (
        //       <div className="productListItem">
        //         <img className="productListImg" src={params.row.img} alt="" />
        //         {params.row.title}
        //       </div>
        //     );
        //   },
        // },
        { field: "userId", headerName: "User ID", width: 130 },
        { field: "price", headerName: "Price", width: 110 },
        { field: "address", headerName: "Address", width: 140 },

        {
            field: "phone",
            headerName: "Phone",
            width: 130,
        },
        {
            field: "createdAt",
            headerName: "Date",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        {moment(params.row.createdAt).format('h:mm a DD-MM-YYYY ')}
                    </>
                );
            },
        },
        {
            field: "status", headerName: "Status", width: 130,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link> */}
                        <select onChange={handleChange} value={params.row.status} id={params.row._id} name="status" >
                            <option value="0">Chờ xử lý</option>
                            <option value="1">Đang giao hàng </option>
                            <option value="2">Đã giao hàng</option>
                        </select>


                    </>
                );
            },
        },
        // {
        //   field: "action",
        //   headerName: "Action",
        //   width: 150,
        //   renderCell: (params) => {
        //     return (
        //       <>
        //         <Link to={"/product/" + params.row._id}>
        //           <button className="productListEdit">Edit</button>
        //         </Link>
        //         <DeleteOutline
        //           className="productListDelete"
        //           onClick={() => handleDelete(params.row._id)}
        //         />
        //       </>
        //     );
        //   },
        // },
    ];

    return (
        <div style={{ flex: 4, height: "90vh", width: "100%" }}>
            <DataGrid
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}
