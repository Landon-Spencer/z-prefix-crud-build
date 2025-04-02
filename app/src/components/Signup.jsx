import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/material/Modal';
import AuthContext from './AuthContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'gray',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Signup() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({})
  const { user, setUser } = useContext(AuthContext);
  user.change = false;
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewUser = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(`http://localhost:8080/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${resData.message}`);
      }

      console.log('Success:', resData.message);
      alert(resData.message);
      setOpen(false);
      setFormData({})
    } catch (err) {
      console.error('Error:', err);
      alert('Error:' + err);
      setFormData({})
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Sign up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-last_name"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New User
          </Typography>
          <FormControl>
            <FormLabel>First Name:</FormLabel>
            <Input
              // html input attribute
              name="first_name"
              type="text"
              placeholder="name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name:</FormLabel>
            <Input
              // html input attribute
              name="last_name"
              type="text"
              placeholder="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input
              // html input attribute
              name="username"
              type="text"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button onClick={handleNewUser}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}