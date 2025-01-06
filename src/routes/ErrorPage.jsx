import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Something went wrong, try again?</h2>
      <Button onClick={() => navigate("/")}>Go back to home</Button>
    </div>
  )
}

export default ErrorPage;