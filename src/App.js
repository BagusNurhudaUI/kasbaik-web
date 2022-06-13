import logo from './logo.svg';
import { BrowserRouter as Router, Routes,  Route, useParams} from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User/User'
import UserDetail from './pages/UserDetail'
import MitraDetail from './pages/MitraDetail'
import PeminjamanDetail from './pages/PeminjamanDetail'
import PembayaranDetail from './pages/PembayaranDetail';
import Mitra from './pages/Mitra'
import Peminjaman from './pages/Peminjaman/Peminjaman'
import Pembayaran from './pages/Pembayaran/Pembayaran'
import './App.css';

function App() {

  return (
    <div className="App">
        
        <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/user" element={<User />}/>
          <Route exact path="/user/:id_user" element={<UserDetail  />}/>
          <Route exact path="/mitra" element={<Mitra />}/>
          <Route exact path="/mitra/:id_mitra" element={<MitraDetail  />}/>
          <Route exact path="/peminjaman" element={<Peminjaman />}/>
          <Route exact path="/peminjaman/:id_peminjaman" element={<PeminjamanDetail />}/>
          <Route exact path="/pembayaran" element={<Pembayaran />}/>
          <Route exact path="/pembayaran/:id_pembayaran" element={<PembayaranDetail />}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
