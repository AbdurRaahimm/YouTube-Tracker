// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ApiProvider from '@/context/ApiProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ApiProvider>
    <App />
  </ApiProvider>,
)
