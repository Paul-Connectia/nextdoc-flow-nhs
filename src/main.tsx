import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { InstagramProvider } from '@/contexts/InstagramContext'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InstagramProvider>
      <App />
    </InstagramProvider>
  </React.StrictMode>
);
