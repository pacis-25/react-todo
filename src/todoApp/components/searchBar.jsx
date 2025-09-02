import { TextField, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SearchBar({ value, onChange, dateValue, onDateChange, priorityValue, onPriorityChange, }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
      <TextField
        fullWidth
        label="Search todos"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        size="medium"
      />
      {/* add this filter by date */}
      <TextField
        label="Filter by date"
        type="date"
        value={dateValue}
        onChange={(e) => onDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="medium"
        sx={{ minWidth: 80 }}
      />
      {/* priority label feature */}
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="priority-filter-label">Priority</InputLabel>
        <Select
          labelId="priority-filter-label"
          label="Priority"
          value={priorityValue}
          onChange={(e) => onPriorityChange(e.target.value)}
          size="medium"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
