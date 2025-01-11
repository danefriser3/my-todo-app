export interface Task {
  id: string; // Identificativo univoco del task
  title: string; // Titolo del task
  completed: boolean; // Stato del task
}

export interface TodoList {
  id: string; // Identificativo univoco della lista
  name: string; // Nome della lista
  tasks: Task[]; // Array di task
}
