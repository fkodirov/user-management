import React, { useState } from "react";
import { User } from "../../types";
import { Link } from "react-router-dom";
import TripleIcon from "../../assets/triple.svg?react";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: User;
  onArchive: () => void;
  onHide: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onArchive, onHide }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.logo}>
        <img src="https://via.placeholder.com/120" alt="avatar" />
      </div>
      <div className={styles.info}>
        <h3>{user.username}</h3>
        <p>At work</p>
        <p>{user.address.city}</p>
        <button className={styles.triple} onClick={toggleDropdown}>
          <TripleIcon />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <Link to={`/edit/${user.id}`}>Редактировать</Link>
            <button onClick={onArchive}>Архивировать</button>
            <button onClick={onHide}>Скрыть</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
