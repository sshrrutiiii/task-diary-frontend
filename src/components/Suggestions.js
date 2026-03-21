import React from "react";
import { Box, Typography } from "@mui/material";

export default function StreakTracker({ tasks }) {

  const completedDates = tasks
    .filter((task) => task.status === "Completed")
    .map((task) => new Date(task.date).toDateString());

  const uniqueDates = [...new Set(completedDates)];

  const today = new Date();

  let streak = 0;

  for (let i = 0; i < 30; i++) {

    const checkDate = new Date();
    checkDate.setDate(today.getDate() - i);

    const dateString = checkDate.toDateString();

    if (uniqueDates.includes(dateString)) {
      streak++;
    } else {
      break;
    }

  }

  return (

    <Box
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 2,
        boxShadow: 2
      }}
    >

      <Typography variant="h6">
        🔥 Productivity Streak
      </Typography>

      <Typography>
        {streak} day streak
      </Typography>

    </Box>

  );

}