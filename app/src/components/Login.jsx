import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import AuthContext from './AuthContext'
import Cookies from 'js-cookie'
import Signup from './Signup'

export default function Login(props) {
  const [formData, setFormData] = useState({username: '', password: ''})
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch ('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      if (resData.login) {
        setUser(resData);
        Cookies.set('id', `${resData.id}`)
        Cookies.set('first_name', `${resData.first_name}`)
        Cookies.set('last_name', `${resData.last_name}`)
        navigate(`/user/${resData.id}`)
      } else {
        alert(resData.message);
      }
      setFormData({username: '', password: ''});
    } catch (err) {
      console.log('Error:', err);
      setFormData({username: '', password: ''});
    }

  }

  return (
    <>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button onClick={handleLogin}>Log in</Button>
        <Typography level="body-sm">Create a new account!</Typography>
        <Signup/>
      </Sheet>
    </>
  );
}