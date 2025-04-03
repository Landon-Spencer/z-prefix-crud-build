import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DeleteIcon from '@mui/icons-material/Delete'
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

export default function DeleteItem(item) {
  const deleteItem = item.item;
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/items/${deleteItem.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error(`HTTP error. status: ${res.status}`)
      }
      const resData = await res.json();
      navigate(`/user/${user.id}`)
    } catch (err) {
      console.log('Error:', err)
      alert('Error:', err)
    }
  }

  return (
    <div>
      <Button variant='outlined' color='error' startIcon={<DeleteIcon/>}onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this item?
          </Typography>
          <Button variant='outlined' color='error' startIcon={<DeleteIcon/>} onClick={handleDelete}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
}
