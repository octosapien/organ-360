import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateArchive from './CreateArchive';
import App from './App';
import ArchivePage from './ArchivePage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/archive/:id" element={<ArchivePage />} />
      <Route path="/create-archive" element={<CreateArchive />} />
    </Routes>
  </BrowserRouter>
);
