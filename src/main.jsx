import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
// No HelmetProvider needed for React 19
import App from './App.jsx'
import './index.css'

// Define the base path based on your repo name
const repoName = '/my-portfolio';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Pass the basename prop */}
    <BrowserRouter basename={repoName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)