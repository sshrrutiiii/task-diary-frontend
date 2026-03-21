import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

export default function Analytics({ tasks }) {

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  return (
    <Box sx={glass}>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Analytics
      </Typography>

      <Typography>Total: {total}</Typography>
      <Typography>Completed: {completed}</Typography>

      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ mt: 2 }}
      />

    </Box>
  );
}

const glass = {
  width: 250,
  p: 2,
  backdropFilter: "blur(12px)",
  background: "rgba(255,255,255,0.08)",
  borderLeft: "1px solid rgba(255,255,255,0.2)"
};