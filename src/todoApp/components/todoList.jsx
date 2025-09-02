import { List, Paper, Typography, Box, Pagination } from "@mui/material";
import TodoRow from "./todoRow";

export default function TodoList({ todos, onToggle, onDelete, onUpdate, countPage, onPageChange, page, total, onUpdatePriority }) {

  if (!total) {
    return (
      <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          No todos match your filters.
        </Typography>
      </Paper>
    )
  }

  return (
    <>
      <Paper variant="outlined" sx={{ mt: 1 }}>
        <List disablePadding>
          {todos.map((t) => (
            <TodoRow
              key={t.id}
              todo={t}
              onToggle={() => onToggle(t.id)}
              onDelete={() => onDelete(t.id)}
              onUpdate={(text) => onUpdate(t.id, text)}
              onUpdatePriority={(p) => onUpdatePriority(t.id, p)}
            />
          ))}
        </List>
      </Paper>

      <Box>
        <Pagination
          count={countPage}
          page={page}
          onChange={onPageChange}
        />
      </Box>
    </>
  );
}
