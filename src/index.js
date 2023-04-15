import React from 'react';
import  * as ReactDomClient from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';

import App from './App';



const root = ReactDomClient.createRoot(document.getElementById('root'));

// setInterval(() => {
//     if(window.location.pathname !== "/login")checkAuth()
// }, 5000)


root.render(<React.StrictMode>
    <BrowserRouter>
    <App></App>
    </BrowserRouter>
</React.StrictMode>);

