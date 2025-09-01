import { useEffect, useMemo, useState } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import SearchBar from "./components/searchBar.jsx";
import TodoInput from "./components/todoInput.jsx";
import TodoFilter from "./components/todoFilter.jsx";
import TodoStats from "./components/todoStats.jsx";
import TodoList from "./components/todoList.jsx";

const STORAGE_KEY = "todos";
const theme = createTheme({
  palette: { mode: "dark" },
  shape: { borderRadius: 12 },
});

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const visibleTodos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos
      .filter(t =>
        filter === "active" ? !t.completed :
          filter === "completed" ? t.completed : true
      )
      .filter(t => (q ? t.text.toLowerCase().includes(q) : true));
  }, [todos, filter, query]);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text,
      completed: false,
    };
    setTodos(prev => [newTodo, ...prev]);
  };
  const toggleTodo = (id) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const updateTodo = (id, newText) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: newText } : t)));
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id));
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed));

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100dvh", width: "100dvw", display: "grid", placeItems: "center", px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 630, px: 2 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Todo App
            </Typography>

            <TodoInput onAdd={addTodo} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{ mt: 2 }}
            >
              <SearchBar value={query} onChange={setQuery} />
              <Box sx={{ flexShrink: 0 }}>
                <TodoFilter value={filter} onChange={setFilter} />
              </Box>
            </Stack>

            <TodoStats
              total={todos.length}
              active={activeCount}
              completed={completedCount}
              onClearCompleted={clearCompleted}
              hasCompleted={completedCount > 0}
              sx={{ mt: 1.5 }}
            />

            <Box sx={{ mt: 1 }}>
              <TodoList
                todos={visibleTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
