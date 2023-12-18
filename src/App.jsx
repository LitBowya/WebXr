import { Route, Routes } from 'react-router-dom'
// import CubeComponent from './components/cube/CubeComponent'
import './App.css'
import XrCubeComponent from './components/xr-cube/XrCubeComponent';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<XrCubeComponent />} />
      {/* <Route path="/cube" element={<CubeComponent />} /> */}
      <Route path="/xr-cube" element={<XrCubeComponent />} />
    </Routes>
  );
}

export default App