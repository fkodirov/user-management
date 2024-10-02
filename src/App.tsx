// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import EditUserPage from './pages/EditUserPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.scss'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditUserPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
