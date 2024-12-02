import { useContext } from "react";
import styles from "./Header.module.scss";
import { TodoContext } from "../../context/TodoContext";

function Header() {
  const { todos } = useContext(TodoContext);
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <header className={styles.header}>
      <h1>To-Do List</h1>
      <p>
        Total: {total} | Completadas: {completed}
      </p>
    </header>
  );
}

export default Header;
