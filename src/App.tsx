import { Route, Routes } from 'react-router-dom';
import Globe from './components/Globe';
import Home from './pages/Home';
import Preview from './pages/Preview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Preview />} />
      <Route path="/home" element={<Home />} />
      <Route path="/globe" element={<Globe />} />
    </Routes>
  );
}

export default App;