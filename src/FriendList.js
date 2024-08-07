// FriendList.js
import React from 'react';
import './FriendList.css';
import FriendCard from "./FriendCard";

export default function FriendList({ friends, onDeleteFriend }){

    const today = new Date();

    function isValidLocation(location, date){
        // Check if the location has a start and end date
        if (!location.startDate || !location.endDate) {
            return false; // No dates, assume home city
        }

        // Convert dates to Date objects
        const startDate = new Date(location.startDate);
        const endDate = new Date(location.endDate);

        // Check if the current date is within the location's timeframe
        return date >= startDate && date <= endDate;
    };


     return (
    <div className="Friend-List">
      <ul>
        {friends.map((friend) => {
          const currentLocation = friend.locations.find(location => isValidLocation(location, today));
          const officialLocation = currentLocation ? currentLocation.city : friend.homeCity;
          return (
            <FriendCard friend={friend} location={officialLocation} onDeleteFriend={onDeleteFriend}/>
          );
        })}
      </ul>
    </div>
  );
};


