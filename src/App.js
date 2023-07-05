import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/Navbar';
import UpdateProfile from './pages/UpdateProfile';
import { useFirebase } from './context/firebase';

function App() {

  const navigate = useNavigate();
  const firebase = useFirebase();

  console.log(firebase)

  

  return (
    <div>
    <NavBar/>
    <Routes>
      <Route  path='/' element = {<Home/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/update/profile' element = {<UpdateProfile/>} />
    </Routes>
    </div>
  );
}

export default App;
