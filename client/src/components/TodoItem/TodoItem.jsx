import { useContext } from "react";
import styles from "./TodoItem.module.scss";
import { updateTodo, deleteTodo } from "../../services/api";
import { TodoContext } from "../../context/TodoContext";

function TodoItem({ todo }) {
  const { setTodos } = useContext(TodoContext);

  const toggleComplete = async () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    await updateTodo(todo.id, updatedTodo);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
  };

  const removeTodo = async () => {
    await deleteTodo(todo.id);
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <div className={styles.todo}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <span className={todo.completed ? styles.completed : ""}>
        {todo.title}
      </span>
      <button onClick={removeTodo}>Excluir</button>
    </div>
  );
}

export default TodoItem;
