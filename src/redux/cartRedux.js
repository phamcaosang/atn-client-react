import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if (!state.products.some(product => Object.entries(product).toString() === Object.entries(action.payload).toString() )){
        state.quantity += action.payload.quantity;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      state.quantity -= action.payload.quantity;
      state.products.splice(state.products.findIndex(product => Object.entries(product).toString() === Object.entries(action.payload).toString()), 1)
      state.total -= action.payload.price * action.payload.quantity;
    },
    clearCart: (state, action) => {
      state.quantity = 0;
      state.products.splice(0, state.products.length)
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;