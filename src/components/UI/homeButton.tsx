// button to go back to home page from globe view
import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/home')}
      className="absolute top-4 left-4 z-10 bg-white bg-opacity-75 hover:opacity-80 text-gray-800 font-semibold py-2 px-4 rounded shadow-md transition duration-300"
    >
      Home
    </button>
  );
}