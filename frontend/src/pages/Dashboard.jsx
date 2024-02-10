// Dashboard.js (Dashboard Component)

import React, { useState } from 'react';

const usersList = ['user1', 'user2', 'user3', 'user4', 'user5']; // Replace with your actual user data

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSubmitMessage = () => {
    // Implement your logic to handle submitted messages
    console.log(`Message submitted to ${selectedUser}: ${messageInput}`);
    setMessageInput('');
  };

  return (
    <div className="dashboard-container">
      {/* User Sidebar Section */}
      <div className="user-sidebar">
        <div className="search-box">
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="users-list">
          {usersList.map((user) => (
            <div key={user} className={`user-item ${selectedUser === user ? 'active' : ''}`} onClick={() => handleUserClick(user)}>
              {user}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Screen Section */}
      <div className="chat-screen">
        <div className="welcome-heading">
          {selectedUser ? `Welcome to Chat, ${selectedUser}!` : 'Select a user to start chatting'}
        </div>
        {selectedUser && (
          <>
            <div className="chat-header">{selectedUser}</div>
            <div className="chat-section"> {/* Display chat messages here */}</div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button onClick={handleSubmitMessage}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
