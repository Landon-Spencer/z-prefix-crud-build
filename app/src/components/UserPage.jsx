import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const pathId = useParams();

  // useEffect(() => {
  //   fetch(`http://localhost:8080/items/${pathId.id}`)
  //     .then(res => res.json())
  //     .then(data => setItemPage(data))
  //     .catch(err => console.log(err));
  // }, []);

  return (
    <>
      <h1>User Page</h1>
    </>
  )
}