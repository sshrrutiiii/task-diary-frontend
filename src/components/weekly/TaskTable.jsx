import React from "react";
import { Box } from "@mui/material";
import TaskRow from "./TaskRow";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function TaskTable({ tasks, setTasks }) {

  return (
    <Box sx={glassCard}>

      {/* HEADER */}
      <Box sx={{ display: "flex", fontWeight: "bold", mb: 2 }}>
        <Box sx={{ width: 200 }}>Task</Box>

        {days.map(day => (
          <Box key={day} sx={{ width: 60, textAlign: "center" }}>
            {day}
          </Box>
        ))}

        <Box sx={{ width: 100 }}>Progress</Box>
      </Box>

      {tasks.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}

    </Box>
  );
}

const glassCard = {
  p: 2,
  mb: 3,
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)"
};