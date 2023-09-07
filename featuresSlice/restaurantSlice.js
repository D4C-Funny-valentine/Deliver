import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantItem: {
    _id: null,
    imgUrl: null,
    name: null,
    rating: null,
    type: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};


export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state,action) => {
        state.restaurantItem = action.payload
    }
  },
});

export const {setRestaurant} = restaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurantItem

export default restaurantSlice.reducer;
