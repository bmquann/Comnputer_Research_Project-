import { findUserSuccess, getUsersSuccess, loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  findProductStart,
  findProductSuccess,
} from "./productRedux";
import { clearOrders, getListSuccess, getOrdersSuccess, setpStats } from "./orderRedux";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    await dispatch(loginSuccess(res.data));
    setTimeout(2000)
    window.location.reload();
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
      footer: '<a href="">Why do I have this issue?</a>'
    })
    dispatch(loginFailure());
  }
};


export const deleteUser = async (id, dispatch) => {
  try {
    await userRequest.delete(`/users/${id}`);

  } catch (err) {
    alert(err.message)
  }
};


export const findUser = async (id, dispatch) => {
  try {
    const res = await publicRequest.get("/users/find/" + id)
    dispatch(findUserSuccess(res.data));
  } catch (err) {

  }
};

export const logOut = async (dispatch, user) => {
  window.location.replace("/")
  dispatch(logout());
  try {
    // dispatch(clear());
    dispatch(clearOrders())
  } catch (err) {
  }
};










export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`,product);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    
    dispatch(updateProductSuccess( res.data));
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    await dispatch(addProductSuccess(res.data));
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Create product complete',
      showConfirmButton: false,
      timer: 1500
    })
    window.location.replace("/products")
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    dispatch(addProductFailure());
  }
};




//Order 

export const getOrders = async (id,dispatch) => {
  try {
    const res = await publicRequest.get(`/carts/find/${id}`);
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    alert(err.message)
  }
};
export const getListOrders = async (dispatch) => {
  try {
    const res = await userRequest.get("/carts");
    dispatch(getListSuccess(res.data));
  } catch (err) {
    alert(err.message)
  }
};
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/carts/${id}`,order);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
};


// User

export const getAllUsers = async (dispatch) => {
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    alert(err.message)
  }
};








export const findProduct = async (id, dispatch) => {
  dispatch(findProductStart());
  try {
    const res = await publicRequest.get("/products/find/" + id)
    dispatch(findProductSuccess(res.data));
  } catch (err) {

  }
};




export const getStats = async (dispatch) => {
  try {
    const res = await userRequest.get("/carts/income");
    const list = res.data.sort((a, b) => {
        return a._id - b._id
    })
    dispatch(setpStats(list))
    
} catch (err) {
    console.log(err);
}
};