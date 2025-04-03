import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ItemCard(inputItem) {
  const navigate = useNavigate();
  let currentItem = inputItem.item;
  let modifiedDescription = currentItem.description;

  if (modifiedDescription.length > 100) {
    modifiedDescription = currentItem.description.slice(0, 100) + '...';
  }

  return (
    <Box className='item-display' sx={{ minWidth: 275 }} onClick={() => {navigate(`/item/${currentItem.id}`)}}>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
            {currentItem.item_name.toUpperCase()}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Quantity: {currentItem.quantity}</Typography>
          <Typography variant="body2">
            {modifiedDescription}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}