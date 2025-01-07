import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      // Send the user's message to the backend API
      const response = await axios.post('http://localhost:1000/users/chatbotResponse', { message });

      // Update the chat history with both the user's message and the bot's reply
      console.log(response)
      setChatHistory([
        ...chatHistory,
        { role: 'user', content: message },
        { role: 'bot', content: response.data.response}
      ]);

      // Clear the input field after sending
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([
        ...chatHistory,
        { role: 'bot', content: 'Error occurred, please try again later.' }
      ]);
    }
  };

  return (
    <div>
      <div>
        {/* Display chat history */}
        {chatHistory.map((chat, idx) => (
          <div key={idx}>
            <strong>{chat.role === 'user' ? 'You' : 'Bot'}:</strong> {chat.content}
          </div>
        ))}
      </div>

      {/* Input field for typing messages */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBot;
