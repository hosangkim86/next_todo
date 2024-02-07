import { Todo } from "../models/Todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const LOCAL_STORAGE_KEY = "todos";

export const getTodos = async (): Promise<Todo[]> => {
  const url = API_URL + "/todos";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const todos = await response.json();
      // ローカルストレージにTODOデータを保存
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
      return todos;
    } else {
      throw new Error(`Failed to fetch todos. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    // ローカルストレージからTODOデータを取得
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
}

export const postTodos = async (todos: Todo[]): Promise<void> => {
  if (!todos || todos.length === 0) return;

  const url = API_URL + "/todos";
  const data = JSON.stringify(todos);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (response.ok) {
      // ローカルストレージにTODOデータを保存
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } else {
      console.error(`Failed to save todos. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
