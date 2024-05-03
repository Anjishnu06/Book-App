import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import MyNavbar from './components/Navbar';
import ListingPage from './pages/List';

function App() {
  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/book/list" element={<ListingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
