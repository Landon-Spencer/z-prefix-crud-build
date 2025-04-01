import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function ItemPage() {
  const [itemPage, setItemPage] = useState([])
  const pathId = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/items/${pathId.id}`)
      .then(res => res.json())
      .then(data => setItemPage(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>{itemPage[0]?.item_name.toUpperCase()}</h1>
      <h2>Description:</h2>
      <h3>{itemPage[0]?.description}</h3>
      <h2>Quantity:</h2>
      <h3>{itemPage[0]?.quantity}</h3>
    </>
  )
}