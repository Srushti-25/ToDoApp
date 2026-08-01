import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DisplayData = ({
  tasks = [],
  deleteTask,
  updateedTask,
  markCompleteTask,
}) => {
  // Loading state (if tasks is not an array)
  if (!Array.isArray(tasks)) {
    return (
      <div className="task-data-list mt-10">
        <div className="bg-gray-300 animate-pulse w-full max-w-md shadow rounded-2xl p-5 h-28"></div>
      </div>
    );
  }

  // No tasks found
  if (tasks.length === 0) {
      const newLocal = "bg-white w-full max-w-md shadow rounded-2xl p-5 text-center";
    return (
      <div className="task-data-list mt-10">
        <div className={newLocal}>
          <h2 className="text-lg font-semibold text-gray-600">
            No tasks available
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="task-data-list mt-10">
      <div className="flex flex-col gap-3">
        {tasks.map((item) => {
          const { title, content, status, createdAt } = item;

          return (
            <div
              key={item._id}
              className="bg-white w-full max-w-md shadow rounded-2xl p-5 flex items-center justify-between"
            >
              <div>
                <h1
                  className={`font-semibold capitalize text-xl ${
                    status === "Complete" ? "line-through" : ""
                  }`}
                >
                  {title}
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                  {new Date(createdAt).toLocaleString("en-IN")}
                </p>

                <p className="mt-2 text-sm font-semibold">{content}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => updateedTask(item._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => markCompleteTask(item._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
                >
                  Complete
                </button>

                <button
                  onClick={() => deleteTask(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayData;