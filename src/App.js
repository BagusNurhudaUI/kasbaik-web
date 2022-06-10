import logo from './logo.svg';
import { BrowserRouter as Router, Routes,  Route, useParams} from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'
import UserDetail from './pages/UserDetail'
import Mitra from './pages/Mitra'
import Peminjaman from './pages/Peminjaman'
import Pembayaran from './pages/Pembayaran'
import './App.css';

function App() {
  const { id_user } = useParams();
  console.log('id user di app',id_user);
  return (
    <div className="App">
        
        <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/user" element={<User />}/>
          <Route exact path="/user/:id_user" element={<UserDetail id_user={id_user} />}/>
          <Route exact path="/mitra" element={<Mitra />}/>
          <Route exact path="/peminjaman" element={<Peminjaman />}/>
          <Route exact path="/pembayaran" element={<Pembayaran />}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
