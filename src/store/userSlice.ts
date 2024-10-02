import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { User } from '../types';

interface UserState {
  users: User[];
  archive: User[];
}

const initialState: UserState = {
  users: [],
  archive: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      console.log(index);
      if (index >= 0) {state.users[index] = action.payload;}
    },
    archiveUser: (state, action: PayloadAction<number>) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        state.archive.push(user);
        state.users = state.users.filter(user => user.id !== action.payload);
      }
    },
    hideUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    activateUser: (state, action: PayloadAction<number>) => {
      const user = state.archive.find(user => user.id === action.payload);
      if (user) {
        state.users.push(user);
        state.archive = state.archive.filter(user => user.id !== action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { editUser, archiveUser, hideUser, activateUser } = userSlice.actions;
export default userSlice.reducer;
