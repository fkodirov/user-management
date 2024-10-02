import React from 'react';
import { User } from '../types';
import { useDispatch } from 'react-redux';
import { activateUser } from '../store/userSlice';

interface ArchiveSectionProps {
  users: User[];
}

const ArchiveSection: React.FC<ArchiveSectionProps> = ({ users }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Архив</h2>
      {users.length === 0 ? (
        <p>Архив пуст</p>
      ) : (
        users.map(user => (
          <div key={user.id} className="archived-user">
            <p>{user.username}</p>
            <button onClick={() => dispatch(activateUser(user.id))}>Активировать</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ArchiveSection;
