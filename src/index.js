import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Header';
import Properties from './Properties';
import { addFavorite, getFavorites, getProperties, removeFavorite } from 'utils';
import reportWebVitals from './reportWebVitals';
import './bootstrap';

const properties = await getProperties();
const favorites = getFavorites();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <Properties
            properties={properties}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        } />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
