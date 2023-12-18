import { Route, Routes } from 'react-router-dom'

import GeoARDemo from './components/GeoARDemo';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GeoARDemo />} />
    </Routes>
  );
}

export default App