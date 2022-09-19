import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PinProvider } from './PinContext';
import GlobalStyle from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PinProvider>
      <GlobalStyle/>
      <App /> 
    </PinProvider>
);

