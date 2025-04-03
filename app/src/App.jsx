import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Button from '@mui/joy/Button';
import Home from './components/Home'
import Login from './components/Login'
import ItemPage from './components/ItemPage'
import UserPage from './components/UserPage'
import AuthContext from './components/AuthContext'
import Cookies from 'js-cookie'
import './App.css'


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const value = {user, setUser};

  if (document.cookie && Object.keys(user).length === 0) {
    setUser(Cookies.get());
  }

  return (
    <>
    <AuthContext.Provider value={value}>
      <div className='header'>
        <div className='title'>
          <h1>Fruit Stand Inventory Tracker</h1>
        </div>
        <div className='nav'>
          <Button onClick={() => {navigate('/')}}>Home</Button>
          {(Object.keys(user).length < 2)
            ? <Button onClick={() => {navigate('/login')}}>Login</Button>
            : <>
              <Button onClick={() => {navigate(`/user/${user.id}`)}}>{`${user.first_name}'s page`}</Button>
              <Button onClick={() => {
                  setUser({})
                  Object.keys(Cookies.get()).forEach((cookie) => {
                    console.log(cookie.name);
                    Cookies.remove(cookie);
                  })
                  navigate('/')
                }}>Logout</Button>
            </>
          }
        </div>
      </div>
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
