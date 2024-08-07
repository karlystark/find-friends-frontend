import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./FriendForm.css";

export default function FriendForm({onCreateFriend, onUpdateFriend}){
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    homeCity: '',
    locations: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(id){
      const fetchFriend = async () => {
        const response = await axios.get(`http://localhost:4001/api/friends/${id}`);
        setFormData(response.data);
      }
      fetchFriend();
    }
  }, [id]);

  async function handleLocationChange(index, field, value){
    const updatedLocations = [...formData.locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: value };
    setFormData({ ...formData, locations: updatedLocations });
  };

  async function handleAddLocation(){
    setFormData({ ...formData, locations: [...formData.locations, {}] });
  };

  async function handleRemoveLocation(index){
    const updatedLocations = [...formData.locations];
    updatedLocations.splice(index, 1);
    setFormData({ ...formData, locations: updatedLocations });
  };

  async function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if(id){
        await onUpdateFriend(id, formData);
      } else {
        await onCreateFriend(formData);
      }
      navigate('/');
    } catch(error){
      console.error('Error processing request:', error);
    }

    if (!formData.name || !formData.homeCity) {
      alert('Please fill in required fields: Name and Home City');
      return;
    }
  };

  return (
    <div className="Friend-Form">
      <h3>{id? 'Edit Friend' : 'Add a Friend'}</h3>
    <form className="new-friend-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="homeCity">Home City</label>
        <input type="text" id="homeCity" name="homeCity" value={formData.homeCity} onChange={handleChange} />
      </div>

      {formData.locations.map((location, index) => (
        <div key={index} className="location-group">
          <div className="form-group">
            <label htmlFor={`location-${index}-city`}>City:</label>
            <input
              type="text"
              id={`location-${index}-city`}
              name="city"
              value={location.city || ''}
              onChange={(e) => handleLocationChange(index, 'city', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`location-${index}-startDate`}>Start Date:</label>
            <input
              type="date"
              id={`location-${index}-startDate`}
              name="startDate"
              value={location.startDate || ''}
              onChange={(e) => handleLocationChange(index, 'startDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`location-${index}-endDate`}>End Date:</label>
            <input
              type="date"
              id={`location-${index}-endDate`}
              name="endDate"
              value={location.endDate || ''}
              onChange={(e) => handleLocationChange(index, 'endDate', e.target.value)}
            />
          </div>

          <button type="button" className="remove-button" onClick={() => handleRemoveLocation(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={handleAddLocation}>add a travel plan</button>

      <button type="submit" className="submit-button">{id? 'Update Friend': 'Add Friend'}</button>
    </form>
    </div>
  );
};

