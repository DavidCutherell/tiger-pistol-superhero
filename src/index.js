import './css/styles.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


//ReactDOM.render was deprecated so this is now the new way
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
