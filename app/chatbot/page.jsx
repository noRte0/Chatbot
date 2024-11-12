// app/page.js
"use client";

import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user input to the chat history
    const newHistory = [...chatHistory, { role: "user", text: userInput }];
    setChatHistory(newHistory);

    try {
      // Fetch response from API route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();

      // Add the bot response to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "bot", text: data.response },
      ]);
      setUserInput(""); // Clear input
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "bot", text: "Error fetching response. Please try again." },
      ]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 className="text-white">Financial Support Chatbot</h1>

      <div className='text-white' style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", height: "400px", overflowY: "scroll", marginBottom: "20px" }}>
        {chatHistory.map((entry, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <strong>{entry.role === "user" ? "You" : "Chatbot"}:</strong>
            <p>{entry.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about investments..."
          style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
        />
        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "4px", backgroundColor: "#4CAF50", color: "white", border: "none" }}>
          Send
        </button>
      </form>
    </div>
  );
}
