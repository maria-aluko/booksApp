import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
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

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, get } = useAxios('http://localhost:3000');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

// fetch books if books array is empty
  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  // get books from the server and set the data as 'books'
  async function getBooks() {
    try {
      await get('books');
    } catch (error) {
      console.error(error);
    }
  }
//'sync' books with data, didn't work when inside the getBooks function
  useEffect(() => {
    if (data) {
      setBooks(data);
      setIsLoading(false);
    }
  }, [data]); //runs when data changes
    
  // Filter books
  useEffect(() => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(searchTermLowerCase) ||
      book.author.toLowerCase().includes(searchTermLowerCase) ||
      book.genres.some((genre) => genre.toLowerCase().includes(searchTermLowerCase))
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  // loading animation if still fetching, otherwise map each book into a card
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      <TextField
        label='Search by title, author or genre'
        variant='outlined'
        fullWidth
        margin='normal'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
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
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;