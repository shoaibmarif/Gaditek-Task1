import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice"; // Assuming you have a tasksSlice
import filterReducer from "./filterSlice"; // Import the filterReducer from a separate file

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer, // Add filterReducer to the store
  },
});

export default store;
