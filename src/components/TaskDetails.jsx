import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTaskDetails } from "../redux/tasksSlice"; // Ensure this action exists in your slice

const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  // Try to fetch the task from Redux store or localStorage
  const reduxTask = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id == parseInt(id))
  );

  // Load task from localStorage if not found in Redux
  useEffect(() => {
    if (reduxTask) {
      setTask(reduxTask); // If task found in Redux store, use it
    } else {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (savedTasks) {
        const foundTask = savedTasks.find((task) => task.id == parseInt(id));
        if (foundTask) {
          setTask(foundTask); // If task found in localStorage, use it
        }
      }
    }
  }, [id, reduxTask]);

  // Dispatch task details to Redux when the component loads
  useEffect(() => {
    if (task) {
      dispatch(setTaskDetails(task)); // Dispatch task data to Redux store
    }
  }, [task, dispatch]);

  if (!task) {
    return (
      <div className="text-center text-lg font-semibold">Task not found</div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-3/4 mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-6">Task Details</h2>
      <div className="mb-4">
        <span className="font-bold text-gray-700">Task ID: </span>
        <span className="text-gray-600">{task.id}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold text-gray-700">Title: </span>
        <span className="text-gray-600">{task.title}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold text-gray-700">Description: </span>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="mb-4">
        <span className="font-bold text-gray-700">Status: </span>
        <span
          className={`text-${
            task.completed ? "green" : "yellow"
          }-500 font-semibold`}
        >
          {task.completed ? "Completed" : "Active"}
        </span>
      </div>
      <button
        onClick={() => navigate("/tasks")}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition-colors"
      >
        Back to Tasks
      </button>
    </div>
  );
};

export default TaskDetails;
