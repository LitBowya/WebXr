import { Route, Routes } from 'react-router-dom'

import XrCubeComponent from './components/xr-cube/XrCubeComponent';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<XrCubeComponent />} />
    </Routes>
  );
}

export default App
