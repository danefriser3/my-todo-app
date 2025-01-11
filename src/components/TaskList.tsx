import React from "react";
import { Task } from "../models/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}) => {
  return (
    <ul className="gap-3 flex flex-col w-full h-[560px] p-1 overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      ))}
      {!tasks.length && <span className="text-center">No items</span>}
    </ul>
  );
};

export default TaskList;
