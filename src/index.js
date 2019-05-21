import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Error from './error'

ReactDOM.render(
  <BrowserRouter>
    <Error>
      <App />
    </Error>
  </BrowserRouter>
, document.getElementById('root'));
