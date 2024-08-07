import FriendList from "./FriendList";

export default function Home({ friends, onDeleteFriend, onUpdateFriend }) {
  return (
  <div className="Home">
    <FriendList friends={friends} onDeleteFriend={onDeleteFriend} onUpdateFriend={onUpdateFriend} />
  </div>
  );
};