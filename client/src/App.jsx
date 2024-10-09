import { useState} from 'react'
import {BrowserRouter as Router, Routes, Route}from "react-router-dom"
import './App.css'
import { Button, useColorMode } from '@chakra-ui/react'
import { ColorModeSwitcher } from './colorModeSwitcher'
import Home from './components/Home'
import Update from './components/Update'
import Delete from './components/Delete'
import Add from './components/Add'
function App() {
  return (
    <Router>
      <ColorModeSwitcher/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path='/delete' element={<Delete/>}/>
          <Route path='/create' element={<Add/>}/>
      </Routes>

    </Router>
  )
}

export default App
