import "./Nav.css";
import { Link } from 'react-router-dom';

export default function Nav() {

  return (
    <div className="Nav">
      <div className="Logo">
        <img src="/icons/plant10.png" alt="bunch of flowers" />
        <h1><Link to="/">WHERE ARE MY FRIENDS?</Link></h1>
        <img src="/icons/plant4.png" alt="bunch of plants" />
      </div>
      <ul>
        <li><Link to="/about">About the App</Link></li>
        <li><Link to="/add-friend">Add a Friend</Link></li>
      </ul>
    </div>
  );
}