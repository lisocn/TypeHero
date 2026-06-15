import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { useUserStore } from './stores/userStore'
import { useGameStore } from './stores/gameStore'
import { useCheckinStore } from './stores/checkinStore'

const token = localStorage.getItem('typehero_token')
if (token) {
  useUserStore.getState().initFromServer()
  useGameStore.getState().initFromServer()
  useCheckinStore.getState().initFromServer()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
