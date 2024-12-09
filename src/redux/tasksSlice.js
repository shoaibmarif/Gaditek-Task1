// tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  taskDetails: null,
  filter: "All", // Default filter
  // New field for task details
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setTaskDetails: (state, action) => {
      state.taskDetails = action.payload; // Store task details
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setFilter,
  setTasks,
  addTask,
  deleteTask,
  editTask,
  setTaskDetails,
} = tasksSlice.actions;
export default tasksSlice.reducer;
