import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Интерфейс Address и Company для описания структуры данных
interface Address {
  city: string;
}

interface Company {
  name: string;
}

// Интерфейс User должен быть экспортирован
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  company: Company;
}

// Создаем API с помощью RTK Query
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      transformResponse: (response: User[]) => response.slice(0, 6),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

// Экспорт хуков, созданных RTK Query
// export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
