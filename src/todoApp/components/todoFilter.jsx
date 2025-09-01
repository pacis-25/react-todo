import { Tabs, Tab, Paper } from "@mui/material";

const optionsLabel = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function TodoFilters({ value, onChange }) {
  const idx = optionsLabel.findIndex(x => x.key === value);
  return (
    <Paper variant="outlined" sx={{ borderRadius: 10 }}>
      <Tabs
        value={idx}
        onChange={(_, i) => onChange(optionsLabel[i].key)}
        aria-label="todo filters"
        variant="fullWidth"
      >
        {optionsLabel.map((o) => (
          <Tab key={o.key} label={o.label} />
        ))}
      </Tabs>
    </Paper>
  );
}
