import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { LanguageProvider } from "./Context/LanguageContext";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoute';
import Header from './Components/Header';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
