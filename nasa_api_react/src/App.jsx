import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Altre route che aggiungerò in futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;