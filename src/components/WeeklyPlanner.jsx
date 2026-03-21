import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

import TaskTable from "./TaskTable";
import AnalyticsPanel from "./AnalyticsPanel";

export default function WeeklyPlanner() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("weeklyTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("weeklyTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask) return;

    const newEntry = {
      id: Date.now(),
      name: newTask,
      priority: "Medium",
      category: "General",
      notes: "",
      days: [false, false, false, false, false, false, false]
    };

    setTasks([...tasks, newEntry]);
    setNewTask("");
  };

  const clearWeek = () => {
    if (window.confirm("Clear week?")) {
      setTasks(tasks.map(t => ({ ...t, days: t.days.map(() => false) })));
    }
  };

  return (
    <Box sx={{ p: 3, flex: 1 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Weekly Planner
      </Typography>

      {/* GLASS INPUT CARD */}
      <Box sx={glassCard}>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            label="Add Weekly Task"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <Button variant="contained" onClick={addTask}>
            Add
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={clearWeek}>
            Clear Week
          </Button>
        </Box>

      </Box>

      <TaskTable tasks={tasks} setTasks={setTasks} />

      <AnalyticsPanel tasks={tasks} />

    </Box>
  );
}

const glassCard = {
  p: 2,
  mb: 3,
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
};