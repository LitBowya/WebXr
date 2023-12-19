import { Route, Routes } from 'react-router-dom'

import XrCube from './components/xr-cube/XrCube';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<XrCube />} />
    </Routes>
  );
}

export default App
