import { createContext, useState, useEffect } from "react";
import { getTodos } from "../services/api";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos();
      setTodos(todosData);
    };
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
