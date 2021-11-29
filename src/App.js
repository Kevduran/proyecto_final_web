import Beginning from './pages/Beginning/beginning';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin.jsx';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import RedirectUser from './pages/Redirect/RedirectUser';

import Private from './Components/PrivateRoute/PrivateRoute';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<RedirectUser />}/>
        <Route path="/" element={<Beginning />}/>

        <Route path="/admin"  element={<Private role="admin"><Admin /></Private>} />
        <Route path="/user"   element={<Private role="user"> <User /> </Private>} />
        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
