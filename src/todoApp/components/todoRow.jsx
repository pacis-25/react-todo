import { useEffect, useRef, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  IconButton,
  TextField,
  ListItemText,
  Stack,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function TodoRow({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const commit = () => {
    const next = draft.trim();
    if (next && next !== todo.text) onUpdate(next);
    setIsEditing(false);
  };
  const cancel = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction="row" spacing={0.5}>
            {isEditing ? (
              <>
                <IconButton edge="end" aria-label="save" onClick={commit}>
                  <SaveIcon />
                </IconButton>
                <IconButton edge="end" aria-label="cancel" onClick={cancel}>
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" color="error" aria-label="delete" onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Stack>
        }
      >
        <ListItemIcon>
          <Checkbox
            checked={todo.completed}
            onChange={onToggle}
            inputProps={{ "aria-label": "toggle complete" }}
          />
        </ListItemIcon>

        {isEditing ? (
          <TextField
            fullWidth
            inputRef={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") cancel();
            }}
            onBlur={commit}
            size="small"
          />
        ) : (
          <ListItemText
            primary={todo.text}
            primaryTypographyProps={{
              sx: todo.completed ? { textDecoration: "line-through", color: "text.disabled" } : {},
            }}
            onDoubleClick={() => setIsEditing(true)}
          />
        )}
      </ListItem>
      <Divider component="li" />
    </>
  );
}
