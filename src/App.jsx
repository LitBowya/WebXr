import { Route, Routes } from 'react-router-dom'
import CubeComponent from './components/cube/CubeComponent'
import XrCubeComponent from "./components/xr-cube/XrCubeComponent";
import './App.css'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CubeComponent />} />
      <Route path="/cube" element={<CubeComponent />} />
      <Route path="/xr-cube" element={<XrCubeComponent />} />
    </Routes>
  );
}

export default App