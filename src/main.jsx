import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ContactProvider} from './components/ContactProvider/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </StrictMode>,
)
