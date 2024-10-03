import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ChakraProvider, ColorModeScript, theme} from "@chakra-ui/react"
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import {ToastContainer} from 'react-toastify'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
      <ToastContainer/>
    </ChakraProvider>
  </StrictMode>,
)
