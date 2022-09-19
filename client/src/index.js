import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PinProvider } from './PinContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PinProvider>
      <App /> 
    </PinProvider>
);

