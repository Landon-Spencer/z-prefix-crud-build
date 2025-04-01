import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ItemCard(inputItem) {

  const navigate = useNavigate();

  // console.log(inputItem);
  let currentItem = inputItem.item;
  let modifiedDescription = currentItem.description;
  if (modifiedDescription.length > 100) {
    modifiedDescription = currentItem.description.slice(0, 100) + '\"...\"';
  }

  return (
    <Box sx={{ minWidth: 275 }} onClick={() => {navigate(`/item/${currentItem.id}`)}}>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {currentItem.item_name.toUpperCase()}
          </Typography>
          {/* <Typography variant="h5" component="div">
          </Typography> */}
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Quantity: {currentItem.quantity}</Typography>
          <Typography variant="body2">
            {modifiedDescription}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </Box>
  );
}