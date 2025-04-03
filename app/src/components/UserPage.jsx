import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import ItemCard from './ItemCard'
import AddItem from './AddItem'
import AuthContext from './AuthContext'

export default function UserPage() {
  const [userItems, setUserItems] = useState([])
  const pathId = useParams();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:8080/user/${pathId.id}`)
      .then(res => res.json())
      .then(data => setUserItems(data))
      .catch(err => console.log(err));
  }, [user]);

  return (
    <>
      <div className='header'>
        <div className='title'>
          <h1>{`${user.first_name}'s Items`}</h1>
        </div>
        <div className='nav'>
          <AddItem/>
        </div>
      </div>
      <div className='all-items'>
        {userItems.map((item) => <ItemCard key={item.id} item={item}></ItemCard>)}
      </div>
    </>
  )
}