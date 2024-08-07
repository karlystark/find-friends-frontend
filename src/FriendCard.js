import "./FriendCard.css";
import { useNavigate } from 'react-router-dom';

const icons = [
  "/icons/plant1.png",
  "/icons/plant2.png",
  "/icons/plant3.png",
  "/icons/plant4.png",
  "/icons/plant5.png",
  "/icons/plant6.png",
  "/icons/plant7.png",
  "/icons/plant8.png",
  "/icons/plant9.png",
  "/icons/plant10.png"
];

export default function FriendCard({ friend, location, onDeleteFriend }) {

  const navigate = useNavigate();

  function randomIcon(icons){
    const randomIdx = Math.floor(Math.random() * 10);
    return icons[randomIdx];
  }

  function handleEditClick(){
    navigate(`/edit-friend/${friend._id}`);
  }

  return (
    <div className="FriendCard">
      <li key={friend._id}>
        <img src={randomIcon(icons)} alt="bunch of flowers" className="friend-icon"/>
        <h3>
          {friend.name}
        </h3>
        <p>{location}</p>
        <button onClick={() => onDeleteFriend(friend._id)}>delete friend</button>
        <button onClick={() => handleEditClick()}>add travel</button>
      </li>
    </div>
  );
}