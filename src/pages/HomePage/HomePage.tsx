import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../store/userApi';
import { archiveUser, hideUser } from '../../store/userSlice';
import UserCard from '../../components/UserCard/UserCard';
import ArchiveSection from '../../components/ArchiveSection';
import { RootState } from '../../store/store';
import styles from "./HomePage.module.scss";


const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const archive = useSelector((state: RootState) => state.users.archive);

  // Use skip option based on whether users already exist in the state
  const { data: fetchedUsers, error, isLoading } = userApi.useGetUsersQuery(undefined, {
    skip: users.length > 0, 
  });
  const userList = users?users:fetchedUsers
  
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных</p>;

  return (
    <div>
      <h1>Список пользователей</h1>
      <div className={styles.userList}>
        {userList&&userList.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onArchive={() => dispatch(archiveUser(user.id))}
            onHide={() => dispatch(hideUser(user.id))}
          />
        ))}
      </div>
      <ArchiveSection users={archive} />
    </div>
  );
};

export default HomePage;
