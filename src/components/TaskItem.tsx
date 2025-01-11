import React from "react";
import { Task } from "../models/Task";
import { Delete } from "@mui/icons-material";

interface TaskItemProps {
  task: Task;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTaskCompletion,
  deleteTask,
}) => {
  return (
    <li className="flex items-center justify-between p-2 proper-shadow rounded-lg">
      <div className="flex items-center w-full gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="w-5 h-5"
        />
        <span
          className={`${
            task.completed ? "line-through text-gray-500" : ""
          } text-lg w-full break-all`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="transition border-l-2"
      >
        <Delete />
      </button>
    </li>
  );
};

export default TaskItem;
