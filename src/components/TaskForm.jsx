import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/tasksSlice";

const TaskForm = ({ taskToEdit, onTaskUpdate }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit); // Pre-fill form fields if editing a task
    } else {
      setTask({
        id: "",
        title: "",
        description: "",
        completed: false,
      }); // Reset to initial state if adding a new task
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      // If we are editing an existing task, update it
      onTaskUpdate(task);
    } else {
      // If we are adding a new task, add it
      dispatch(addTask(task));
    }
    setTask({
      id: "",
      title: "",
      description: "",
      completed: false,
    }); // Reset the form after submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="id" className="block text-gray-700">
          Task ID
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={task.id}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700">
          Task Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="completed" className="mr-2 text-gray-700">
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-gray-600">Yes</span>
      </div>
      <button
        type="submit"
        className="w-full py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
