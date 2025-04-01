import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Home from './components/Home'
import Login from './components/Login'
import ItemPage from './components/ItemPage'
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Inventory</h1>
      <Button variant='contained' onClick={() => {navigate('/')}}>Home</Button>
      <Button variant='contained' onClick={() => {navigate('/login')}}>Login</Button>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/item/:id' element={<ItemPage/>}/>
      </Routes>
    </>
  )
}

export default App
