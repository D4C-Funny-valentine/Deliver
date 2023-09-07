import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../featuresSlice/basketSlice";
import restaurantReducer from "../featuresSlice/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
