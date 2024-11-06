import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // добавляем этот импорт


const root = document.getElementById('root')

// createRoot(root).render(<App />)

createRoot(root).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
