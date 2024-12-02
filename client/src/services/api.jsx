const API_URL = "http://localhost:3003/todos";

export async function getTodos() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createTodo(todo) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
}

export async function updateTodo(id, todo) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

export async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
