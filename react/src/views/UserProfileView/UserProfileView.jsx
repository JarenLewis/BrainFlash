import './UserProfileView.css';

import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function UserProfileView() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className='user-profile'>
      <div>
        <h1>User Profile</h1> <br />
        <p>Hello, {user.username}!</p>
      </div>
    </div>
  );
}