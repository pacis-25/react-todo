import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function TodoInput({ onAdd }) {
  const [message, setMessage] = useState("")

  const submit = (e) => {
    e.preventDefault();
    const m = message.trim();
    if (!m) return;
    onAdd(m);
    setMessage("");
  };

  return (
    <form onSubmit={submit}>
      <Stack direction="row" spacing={1.5}>
        <TextField
          fullWidth
          label="Task for today"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" type="submit">Add</Button>
      </Stack>
    </form>
  );
}
