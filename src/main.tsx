import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import './styles.css'

let activateUpdate: (reloadPage?: boolean) => Promise<void> = async () => undefined
activateUpdate = registerSW({
  onNeedRefresh() {
    if (window.confirm('A new version of Savor is ready. Reload now?')) void activateUpdate(true)
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
