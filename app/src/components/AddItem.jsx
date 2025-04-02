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

export default function AddItem() {
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

  const handleAddItem = async (event) => {
    event.preventDefault();
    formData.user_id = user.id;
    console.log(formData);
    try {
      const res = await fetch(`http://localhost:8080/items`, {
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
      setUser(user.change = !user.change)
    } catch (err) {
      console.error('Error:', err);
      alert('Error:' + err);
      setFormData({})
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Item
          </Typography>
          <FormControl>
            <FormLabel>Item Name:</FormLabel>
            <Input
              // html input attribute
              name="item_name"
              type="text"
              placeholder="name"
              value={formData.item_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description: 255 character limit</FormLabel>
            <Input
              // html input attribute
              name="description"
              type="text"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
              maxLength="255"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quantity:</FormLabel>
            <Input
              // html input attribute
              name="quantity"
              type="number"
              placeholder="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button onClick={handleAddItem}>Add Item</Button>
        </Box>
      </Modal>
    </div>
  );
}