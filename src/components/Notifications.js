import React, { useEffect, useState } from "react";
import { Paper, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("https://562z81q7bj.execute-api.us-east-1.amazonaws.com/pord/");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Paper sx={{ position: "fixed", bottom: "20px", right: "20px", width: "250px", background: "#6a11cb", color: "white", padding: "10px", borderRadius: "10px" }}>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index} sx={{ borderBottom: "1px solid white" }}>
            <ListItemText primary={notification.Message} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Notifications;
