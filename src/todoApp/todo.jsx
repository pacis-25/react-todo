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
  Snackbar,
  Button,
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
  const [page, setPage] = useState(1);
  const [prevDeleted, setPrevDeleted] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false);
  const [date, setDate] = useState("");
   const [priorityFilter, setPriorityFilter] = useState("all");


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); //


  const addTodo = (text, priority = "medium") => {
    const newTodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text,
      completed: false,
      date: new Date().toISOString().split("T")[0], // added date for filter
      priority,
    };
    setTodos(prev => [newTodo, ...prev]);
  };
  const toggleTodo = (id) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const updateTodo = (id, newText) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: newText } : t)));

  const deleteTodo = (id) => {
    setTodos(prev => {
      const idx = prev.findIndex(t => t.id === id);
      if (idx === -1) return prev;
      const removed = prev[idx];
      const next = prev.filter(t => t.id !== id);
      // keep the undo
      setPrevDeleted({ todo: removed, index: idx });
      setSnackOpen(true);
      return next;
    });
  };

  const undoDelete = () => {
    if (!prevDeleted) return;
    setTodos(prev => {
      const next = [...prev];
      // fallback to start
      const insertAt = Math.min(prevDeleted.index ?? 0, next.length);
      next.splice(insertAt, 0, prevDeleted.todo);
      return next;
    });
    setPrevDeleted(null);
    setSnackOpen(false);
  };

  const updatePriority = (id, priority) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, priority } : t)));

  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed));

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  const visibleTodos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos
      .filter(t =>
        filter === "active" ? !t.completed :
          filter === "completed" ? t.completed : true
      )
      .filter(t => (q ? t.text.toLowerCase().includes(q) : true))
      .filter(t => (date ? t.date === date : true)) // filtering for date
      .filter(t =>
        priorityFilter === "all" ? true : (t.priority === priorityFilter)
      );
  }, [todos, filter, query, date, priorityFilter]);

  // pagination
  const pageSize = 5;

  const countPage = Math.max(1, Math.ceil(visibleTodos.length / pageSize))

  const todoPagination = useMemo(() => {
    const firstPage = (page - 1) * pageSize
    return visibleTodos.slice(firstPage, firstPage + pageSize)
  }, [visibleTodos, page]) //ito po yung sa number of pages

      // reset para sa search and filter
  useEffect(() => {
    setPage(1)
  }, [filter, query])

  useEffect(() => {
    if (page > countPage) setPage(countPage);
  }, [countPage, page]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100dvh", width: "100dvw", display: "grid", placeItems: "center", px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 900, px: 2 }}>
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
              <SearchBar
                value={query}
                onChange={setQuery}
                dateValue={date}
                onDateChange={setDate} // for date filter
                priorityValue={priorityFilter}
                onPriorityChange={setPriorityFilter}
              />
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
                todos={todoPagination}
                total={visibleTodos.length}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                countPage={countPage}
                page={page}
                onPageChange={(_, p) => setPage(p)}
                onUpdatePriority={updatePriority}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* uses snackbar mui for undo delete */}
      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={4000}
        message="Todo deleted"
        action={
          <Button color="secondary" size="small" onClick={undoDelete}>
            UNDO
          </Button>
        }
      />
    </ThemeProvider>
  );
}
