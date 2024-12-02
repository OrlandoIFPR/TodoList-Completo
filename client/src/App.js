import { TodoContext, TodoProvider } from "./context/TodoContext";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import styles from "./App.module.scss";

function App() {
  return (
    <TodoProvider>
      <div className={styles.app}>
        <Header />
        <TodoForm />
        <div className={styles.todoList}>
          <TodoContext.Consumer>
            {({ todos }) =>
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            }
          </TodoContext.Consumer>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
