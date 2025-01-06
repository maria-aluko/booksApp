import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from '@mui/material';

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => {
        const foundBook = data.books.find((e) => e.id === parseInt(id));
        setBook(foundBook);
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, [id]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <Stack 
      sx={{ 
        p: 2,
        justifyContent: 'center',
        alignItems: 'center' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '15%',
          minWidth: 200,
        }}
        key={book.name}
      >
        <CardMedia
          sx={{ height: 250 }}
          image={book.img}
          title={book.name}
        />
        <Box sx={{ pt: 2, pl: 2 }}>
          {book.genres.map((genre, i) => (
            <Chip
              key={i}
              label={genre}
              variant="outlined"
              size="small"
            />
          ))}
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            {book.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {book.author}
          </Typography>
        </Box>
        <CardActions
          sx={{
            justifyContent: 'center',
            mt: 'auto',
            pl: 2,
          }}
        >
          <Rating
            name="read-only"
            value={+book.stars}
            readOnly
            size="small"
          />
        </CardActions>
        <Button onClick={() => navigate(-1)}>Back to List</Button>
      </Card>
    </Stack>
  );
};

export default SinglePage;