import Home from './components/Home';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Contact from './components/Contact';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AddServices from './components/admin/services/AddServices';
import ServiceList from './components/admin/services/ServiceList';
import EditService from './components/admin/services/EditService';

import Topbar from './components/admin/dashboard/Topbar';
import Register from './components/Register';
import RegisterAsSP from './components/RegisterAsSP';
import Navbarsp from './components/service_provider/Navbarsp';
import Profile from './components/service_provider/Profile';


function App() {

  
  
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/addservices" element={<AddServices />}></Route>
      <Route path="/servicelist" element={<ServiceList />}></Route>
      <Route path="/admin/services/editservice/:id" element={<EditService/>}></Route>
      <Route path="/topbar" element={<Topbar/>}></Route>
      <Route path="/registersp" element={<RegisterAsSP/>}></Route>
      <Route path="/navbarsp" element={<Navbarsp/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>

        </Routes>
        </BrowserRouter>
  );
}

export default App;
