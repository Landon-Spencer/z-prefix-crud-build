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
      <AddItem/>
      {userItems.map((item) => <ItemCard key={item.id} item={item}></ItemCard>)}
    </>
  )
}