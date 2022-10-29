import { Routes, Route } from 'react-router-dom';
import Music from './components/music';
import Home from './components/Home';

const Main = () => {
return (         
    <Routes>
      <Route path='/' element={<Home/>} />
    <Route path='/music' element={<Music/>} />
  </Routes>
);
}
export default Main;