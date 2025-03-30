import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
         <App />
    </BrowserRouter>
   
)

/*
BrowserRouter is a component from React Router, a library used for handling routing in React applications.
It enables navigation within a single-page application (SPA) without reloading the entire page.
*/