import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MathTutorApp from './Components/MathTutorApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathTutorApp />
  </StrictMode>
);
