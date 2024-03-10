import React from 'react';
import ReactDOM from 'react-dom/client';
import './component/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/Puppy'>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);
reportWebVitals();
