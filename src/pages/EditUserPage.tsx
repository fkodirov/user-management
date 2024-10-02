import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userApi } from '../store/userApi';
import { editUser } from '../store/userSlice';
import { User } from '../store/userApi';

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, error, isLoading } = userApi.useGetUserByIdQuery(id!);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
    companyName: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone,
        companyName: user.company.name,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).every((field) => field.trim() !== '')) {
      const updatedUser: User = {
        id: parseInt(id!),
        ...formData,
        address: { city: formData.city },  // добавьте нужные свойства адреса
        company: { name: formData.companyName },  // добавьте нужные свойства компании
      };
      dispatch(editUser(updatedUser));
      alert('Данные успешно обновлены!');
      navigate('/');
    } else {
      alert('Все поля должны быть заполнены');
    }
  };
  

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных пользователя</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EditUserPage;