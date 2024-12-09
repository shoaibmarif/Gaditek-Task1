import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, deleteTask, editTask, setFilter } from "../redux/tasksSlice";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter); // Access filter from Redux
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      dispatch(setTasks(savedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const filterTasks = () => {
    switch (filter) {
      case "Completed":
        return tasks.filter((task) => task.completed);
      case "Active":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task); // Set the task to be edited
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value)); // Update the filter state in Redux
  };

  const handleTaskUpdate = (updatedTask) => {
    // Dispatch action to update the task
    dispatch(editTask(updatedTask));
    setTaskToEdit(null); // Reset the form to "Add Mode"
  };

  return (
    <div className="flex justify-center gap-12 p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Task Management
          </h2>
          <select
            value={filter} // Bind the value to the Redux filter state
            onChange={handleFilterChange} // Update the filter in Redux
            className="p-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Task ID</th>
              <th className="px-4 py-2 text-left">Task Title</th>
              <th className="px-4 py-2 text-left">Task Description</th>
              <th className="px-4 py-2 text-left">Task Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterTasks().length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No tasks available
                </td>
              </tr>
            ) : (
              filterTasks().map((task) => (
                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-2 text-gray-800">{task.id}</td>
                  <td className="px-4 py-2 text-gray-800">{task.title}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {task.description}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      task.completed ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {task.completed ? "Completed" : "Active"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(task)} // Trigger edit action
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h3>
        <TaskForm
          taskToEdit={taskToEdit}
          onTaskUpdate={handleTaskUpdate} // Pass the handleTaskUpdate function to TaskForm
        />
      </div>
    </div>
  );
};

export default TaskList;
