import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Home from './components/Home'
import Login from './components/Login'
import ItemPage from './components/ItemPage'
import UserPage from './components/UserPage'
import './App.css'
import AuthContext from './components/AuthContext'


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const value = {user, setUser};

  return (
    <>
    <AuthContext.Provider value={value}>
      <h1>Inventory</h1>
      <Button variant='contained' onClick={() => {navigate('/')}}>Home</Button>
      <Button variant='contained' onClick={() => {navigate('/login')}}>Login</Button>
      <Button variant='contained' onClick={() => {setUser({})}}>Logout</Button>
      <Button variant='contained' onClick={() => {navigate('/user')}}>User Page</Button>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/item/:id' element={<ItemPage/>}/>
        <Route path='/user/:id' element={<UserPage/>}/>
      </Routes>
    </AuthContext.Provider>
    </>
  )
}

export default App
