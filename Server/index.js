const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3003;

// Middleware
app.use(bodyParser.json());

// Adicionar os cabeçalhos Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Rotas da API

// [CREATE] Criar uma nova tarefa
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description]
    );
    res
      .status(201)
      .json({ id: result.insertId, title, description, completed: false });
    connection.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    connection.release();
  }
});

// [READ] Listar todas as tarefas
app.get("/todos", async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [todos] = await connection.query("SELECT * FROM todos");
    res.json(todos);
    connection.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    connection.release();
  }
});

// [READ] Obter uma tarefa por ID
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.getConnection();
    const [todos] = await connection.query("SELECT * FROM todos WHERE id = ?", [
      id,
    ]);
    if (todos.length === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(todos[0]);
    connection.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    connection.release();
  }
});

// [UPDATE] Atualizar uma tarefa por ID
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      "UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?",
      [title, description, completed, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json({ id, title, description, completed });
    connection.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    connection.release();
  }
});

// [DELETE] Remover uma tarefa por ID
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query("DELETE FROM todos WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.status(204).send(); // Sem conteúdo
    connection.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
    connection.release();
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
