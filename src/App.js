// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import FriendForm from "./FriendForm";
import About from "./About";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Nav.js";
import './App.css';

export default function App() {
  const [friends, setFriends] = useState([]);

  // fetch friends from database on initial render
  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get('http://localhost:4001/api/friends');
      setFriends(res.data);
    };

    fetchFriends();
  }, []);

  async function handleCreateFriend (newFriend){
    try {
      const response = await axios.post('http://localhost:4001/api/friends', newFriend);
      setFriends([...friends, response.data]);
      console.log('Friend created successfully:', response.data);
    } catch (error) {
      console.error('Error creating friend:', error);
    }
  };


  async function handleUpdateFriend (id, updatedFriend) {
    try {
      const response = await axios.patch(`http://localhost:4001/api/friends/${id}`, updatedFriend);
      setFriends(friends.map(friend => (friend._id === id ? response.data : friend)));
    } catch (error) {
      console.error('Error updating friend:', error);
    }
  };

  async function handleDeleteFriend(id){
    try {
      await axios.delete(`http://localhost:4001/api/friends/${id}`);
      setFriends(friends.filter(friend => friend._id !== id));
    } catch(error){
      console.error('Error deleting friend:', error);
    }
  };

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home friends={friends} onDeleteFriend={handleDeleteFriend} onUpdateFriend={handleUpdateFriend}/>} />
        <Route path="/about" element={<About /> } />
        <Route path="/add-friend" element={<FriendForm onCreateFriend={handleCreateFriend} onUpdateFriend={handleUpdateFriend}/>} />
        <Route path="/edit-friend/:id" element={<FriendForm onCreateFriend={handleCreateFriend} onUpdateFriend={handleUpdateFriend} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

