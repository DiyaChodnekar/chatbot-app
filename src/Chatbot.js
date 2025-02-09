import React, { useState } from "react";
import { Container, TextField, Button, Paper, Typography, Box } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: input
      });
      
      
      const data = await response.text();
      const botMessage = { sender: "Bot", text: data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", height: "100vh", padding: 2 }}>
      <Paper elevation={3} sx={{ flexGrow: 1, overflowY: "auto", padding: 2, mb: 2, borderRadius: 2, display: "flex", flexDirection: "column" }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: "75%",
              padding: 1.5,
              marginY: 1,
              borderRadius: 2,
              alignSelf: msg.sender === "User" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "User" ? "primary.main" : "grey.300",
              color: msg.sender === "User" ? "white" : "black",
              textAlign: msg.sender === "User" ? "right" : "left"
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Chatbot;
