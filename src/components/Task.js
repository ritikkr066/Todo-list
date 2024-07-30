// src/components/Task.js
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { deleteTask } from "../utils/taskUtils";

const Task = ({ task, updateTask, deleteTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  // function to save/edit existing task
  const handleSave = () => {
    updateTask(task.id, { title, description, completed });

    setIsEditing(false);
  };
  // function to delete task
  const handleDelete = () => {
    const confirmDelete = window.confirm("Do you want to delete this task?");
    if (confirmDelete) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="p-4 border">
      <div className="flex items-center justify-between">
        <div className="flex">
          {/* title  */}
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-1 border"
            />
          ) : (
            <div className="pr-4">{task.title}</div>
          )}
          {/* status showing pending or completed */}
          {completed === true ? (
            <div className="bg-green-500 px-1 text-white ml-auto absolute flex justify-center right-16 align-middle  border-[2px]">
              Completed
            </div>
          ) : (
            <span className="bg-red-500 text-white px-1  ml-auto absolute flex justify-center right-16 align-middle  border-[2px]">
              Pending
            </span>
          )}
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="ml-4">
          {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      {/* description */}
      {isExpanded && (
        <div className="mt-2">
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-1 border"
            />
          ) : (
            <p>{task.description}</p>
          )}
          {/* status */}
          {isEditing && (
            <div>
              <select
                value={task.completed}
                onChange={(e) => setCompleted(e.target.value === "true")}
                className="block w-full p-2 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="false">Pending</option>
                <option value="true">Completed</option>
              </select>
            </div>
          )}
          {/* last updated time */}
          <div className="block text-sm text-gray-500">
            Last updated: {new Date(task.lastUpdated).toLocaleString()}
          </div>
          {/* save/edit button */}
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-1 mt-2 text-white bg-green-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 mt-2 text-white bg-yellow-500"
            >
              Edit
            </button>
          )}
          {/* delete button */}
          <button
            onClick={handleDelete}
            className="p-1 mt-2 ml-2 text-white bg-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
