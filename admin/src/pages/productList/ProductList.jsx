import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProduct, getProducts } from "../../redux/apiCalls";
// import numberWithCommas from "../../numberWithCommas";
import Swal from 'sweetalert2'
export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.order.list);
  const prodList = [];
  orders.forEach(order => {
    order.products.forEach(product => prodList.push(product));
  });
  useEffect(() => {
    getProducts(dispatch);
    // getListOrders(dispatch); 
  }, [dispatch]);

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
        deleteProduct(id, dispatch);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image01} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "sales", headerName: "Sales", width: 140, renderCell: (params) => {
        return (
            <div>
              { (prodList.filter(function (value) {
              return value.slug === params.row.slug;
            }).length)}
            </div>
        );
      },   
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link onClick={() => findProduct(params.row._id,dispatch)} to={"/product/" + params.row._id}>
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
    <div style={{ flex: 4, height: "90vh", width: "100%" }}>
      <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
