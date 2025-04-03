import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import AuthContext from './AuthContext'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import DeleteItem from './DeleteItem'
import Input from '@mui/joy/Input';

export default function ItemPage() {
  const [itemPage, setItemPage] = useState({})
  const pathId = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({})
  const [edit, setEdit] = useState(false);

  if (document.cookie && Object.keys(user).length === 0) {
    setUser(Cookies.get());
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/items/${itemPage.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(`${resData.message}`);
      }
      alert(resData.message);
      setFormData({})
      setEdit(!edit)
    } catch (err) {
      alert(err);
      setFormData({})
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8080/items/${pathId.id}`)
      .then(res => res.json())
      .then(data => {
        setItemPage(data[0])
        setFormData(data[0])
      })
      .catch(err => console.log(err));
  }, [edit]);

  return (
    <>
      {edit
        ? <>
            <h2>Name:</h2>
            <Input
              name="item_name"
              type="text"
              placeholder={formData.item_name}
              value={formData.item_name}
              onChange={handleChange}
              required
            />
          </>
        : <h1>{itemPage?.item_name?.toUpperCase()}</h1>
      }
      <h2>Description:</h2>
      {edit
        ? <>
            <TextField
              name="description"
              type="text"
              multiline
              style={{
                width: '725px',
                background: 'white',
              }}
              placeholder={formData.description}
              value={formData.description}
              onChange={handleChange}
              maxLength="255"
              required
            />
          </>
        : <h3>{itemPage?.description}</h3>
      }
      <h2>Quantity:</h2>
      {edit
        ? <>
            <Input
              name="quantity"
              type="number"
              placeholder={formData.quantity}
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </>
        : <h3>{itemPage?.quantity}</h3>
      }
      <div className='item-actions'>
        {(user.id == itemPage?.user_id)
          ? <>
            <DeleteItem item={itemPage}/>
            {edit
              ? <Button variant='outlined' startIcon={<EditIcon/>} onClick={handleSaveEdit} >Save Edits</Button>
              : <Button variant='outlined' startIcon={<EditIcon/>} onClick={() => setEdit(!edit)} >Edit</Button>}
          </>
          : <></>}
      </div>
    </>
  )
}