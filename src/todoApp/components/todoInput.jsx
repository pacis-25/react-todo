import { useState } from "react";
import { TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function TodoInput({ onAdd }) {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");

  const submit = (e) => {
    e.preventDefault();
    const m = message.trim();
    if (!m) return;
    onAdd(m, priority);
    setMessage("");
    setPriority("medium");
  };

  return (
    <form onSubmit={submit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          fullWidth
          label="What needs to be done?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
        />
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            size="medium"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">Add</Button>
      </Stack>
    </form>
  );
}
