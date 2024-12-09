import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // Update the filter state
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
