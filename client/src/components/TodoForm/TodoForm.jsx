import { useContext, useState } from "react";
import styles from "./TodoForm.module.scss";
import { createTodo } from "../../services/api";
import { TodoContext } from "../../context/TodoContext";

function TodoForm() {
  const { setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = await createTodo({
      title,
      description: "",
      completed: false,
    });
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TodoForm;
