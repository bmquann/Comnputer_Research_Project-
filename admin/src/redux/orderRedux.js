
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: '',
    list:'',
    pStats:'',
}
export const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

        getOrdersSuccess: (state, action) => {
            state.orders = action.payload;
            // localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        getListSuccess: (state, action) => {
            state.list=action.payload;
        },
        setpStats: (state, action) => {
            state.pStats=action.payload;
        },
        clearOrders: (state) => {
            state.list='';
            state.orders='';
        }
    }
});

export const { getOrdersSuccess,getListSuccess,clearOrders,setpStats } = OrderSlice.actions;
export default OrderSlice.reducer;

