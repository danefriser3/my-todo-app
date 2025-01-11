import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TodoList } from "./models/Task";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { PlaylistAdd, Remove } from "@mui/icons-material";

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useLocalStorage<TodoList[]>(
    "todoLists",
    []
  );
  const [selectedListId, setSelectedListId] = useState<string | null>(
    todoLists.length > 0 ? todoLists[0].id : null
  );

  const addList = (name: string) => {
    const newList: TodoList = {
      id: Date.now().toString(),
      name,
      tasks: [],
    };
    setTodoLists([...todoLists, newList]);
    setSelectedListId(newList.id);
  };

  const deleteList = (id: string) => {
    const updatedLists = todoLists.filter((list) => list.id !== id);
    setTodoLists(updatedLists);
    if (selectedListId === id) {
      setSelectedListId(updatedLists.length > 0 ? updatedLists[0].id : null);
    }
  };

  const addTask = (title: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: Date.now().toString(), title, completed: false },
              ],
            }
          : list
      )
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === selectedListId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const selectedList = todoLists.find((list) => list.id === selectedListId);

  return (
    <div className="w-[calc(100vw-2rem)] md:w-[648px] place-self-center bg-white rounded-lg flex flex-col gap-4 proper-shadow items-center p-4 h-full m-4">
      <h1 className="text-4xl font-bold p-4 text-blue-600">To-do Manager</h1>
      <hr className="border-gray-300 w-full" />
      <div className="w-full flex flex-col gap-4">
        {/* Lista delle ToDo List */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            {todoLists.length !== 0 && (
              <select
                value={selectedListId || ""}
                onChange={(e) => setSelectedListId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg proper-shadow"
              >
                {todoLists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            )}
            {todoLists.length === 0 && (
              <span className="w-full text-center">No list existing.</span>
            )}
            <div className="flex flex-row gap-2 items-center align-middle justify-center">
              <button
                onClick={() => {
                  const listName = prompt("Enter list name:");
                  if (listName) addList(listName);
                }}
                className="w-full bg-blue-500 p-2 py-1 text-white rounded-lg proper-shadow flex flex-row  gap-1"
              >
                <PlaylistAdd /> {todoLists.length === 0 && "Add"}
              </button>
              {selectedListId && (
                <button
                  onClick={() => deleteList(selectedListId)}
                  className="w-full bg-red-500 text-white p-2 py-1 rounded-lg proper-shadow"
                >
                  <Remove />
                </button>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-300 w-full" />
        {/* Task Manager */}
        {selectedList ? (
          <div className="flex flex-col gap-4">
            <AddTask addTask={addTask} />
            <TaskList
              tasks={selectedList.tasks}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          </div>
        ) : (
          <p className="text-gray-500">No list selected or available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
