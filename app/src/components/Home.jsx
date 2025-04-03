import { useState, useEffect } from "react";
import ItemCard from './ItemCard'

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className='all-items'>
        {items.map((item) => <ItemCard key={item.id} item={item}></ItemCard>)}
      </div>
    </>
  )
}