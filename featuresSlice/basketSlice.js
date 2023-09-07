import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItems: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basketItems = [...state.basketItems, action.payload];
    },
    removeFromBasket: (state, action) => {
      const removeItemIndex = state.basketItems.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.basketItems];

      if (removeItemIndex >= 0) {
        newBasket.splice(removeItemIndex, 1);
      } else {
        alert(`Can't remove ${action.payload.name} as it isn't in the basket.`);
      }

      state.basketItems = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItem = (state) => state.basket.basketItems;

export const selectedBasketItemWithId = (state, id) =>
  state.basket.basketItems?.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.basketItems.reduce((total, items) => total + items.price, 0);

export default basketSlice.reducer;
