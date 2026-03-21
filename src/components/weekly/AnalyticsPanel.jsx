import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

export default function AnalyticsPanel({ tasks }) {

  const totalTasks = tasks.length;

  const totalCompleted = tasks.reduce(
    (sum, t) => sum + t.days.filter(Boolean).length,
    0
  );

  const max = totalTasks * 7;

  const percent = max === 0 ? 0 : (totalCompleted / max) * 100;

  return (
    <Box sx={glassCard}>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Weekly Analytics
      </Typography>

      <Typography>Total Tasks: {totalTasks}</Typography>
      <Typography>Completed: {totalCompleted}</Typography>
      <Typography>Progress: {percent.toFixed(1)}%</Typography>

      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ mt: 2, height: 10, borderRadius: 5 }}
      />

    </Box>
  );
}

const glassCard = {
  p: 2,
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)"
};