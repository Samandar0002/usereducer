import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import TableComponent from './usereduce/reduce';
import "./assets/style/tailwind.css"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <TableComponent />
  </React.StrictMode>
);

reportWebVitals();
