import React from "react";
import { Box, Checkbox, TextField, IconButton, LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskRow({ task, tasks, setTasks }) {

  const updateTask = (updated) => {
    setTasks(tasks.map(t => t.id === task.id ? updated : t));
  };

  const toggleDay = (index) => {
    const newDays = [...task.days];
    newDays[index] = !newDays[index];
    updateTask({ ...task, days: newDays });
  };

  const progress = (task.days.filter(Boolean).length / 7) * 100;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
        p: 1,
        borderRadius: 2,
        "&:hover": {
          background: "rgba(255,255,255,0.1)"
        }
      }}
    >

      {/* TASK NAME */}
      <Box sx={{ width: 200 }}>
        <TextField
          variant="standard"
          value={task.name}
          onChange={(e) => updateTask({ ...task, name: e.target.value })}
        />

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mt: 1, height: 6, borderRadius: 5 }}
        />
      </Box>

      {/* DAYS */}
      {task.days.map((day, i) => (
        <Box key={i} sx={{ width: 60, textAlign: "center" }}>
          <Checkbox
            checked={day}
            onChange={() => toggleDay(i)}
          />
        </Box>
      ))}

      {/* PROGRESS */}
      <Box sx={{ width: 100 }}>
        {Math.round(progress)}%
      </Box>

      {/* DELETE */}
      <IconButton onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
        <DeleteIcon />
      </IconButton>

    </Box>
  );
}