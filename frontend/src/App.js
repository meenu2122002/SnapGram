import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route,Link ,useNavigate} from 'react-router-dom';
import Login from './components/login';
import Home from './container/Home';
import { useEffect } from 'react';
import { fetchUser } from './utils/fetchUser';
function App() {
 
  return (
  <BrowserRouter>
  <Routes>
<Route path="/login" element={<Login/>}/>
<Route path="/*" element={<Home/>}/>

  </Routes>
  </BrowserRouter>
  );
}

export default App;
