import { Stack, Typography, Button } from "@mui/material";

export default function TodoStats({
  total,
  active,
  completed,
  onClearCompleted,
  hasCompleted,
  sx,
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={sx}>
      <Typography variant="body2">Total: {total}</Typography>
      <Typography variant="body2">Active: {active}</Typography>
      <Typography variant="body2">Completed: {completed}</Typography>
      <Button
        variant="text"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        sx={{ textDecoration: "underline" }}
      >
        Clear completed
      </Button>
    </Stack>
  );
}
