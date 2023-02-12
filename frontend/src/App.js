import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Farmersignup from './components/authentication/FarmerRoutes';
import FarmerLogin from './components/authentication/Farmerauth';
import EnthusiatsSignup from "./components/authentication/EnthusiatsRoutes";
import EnthusiatsLogin from "./components/authentication/Enthusiatsauth";
import Home from "./components/authentication/home";
import Homepage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
function App() {
  const user = localStorage.getItem("token");
  return (<div className="App">
    <Route path="/chatHome" component={Homepage} exact />
    <Route path="/chats" component={ChatPage} />
    {user &&<Route path="/" exact element={<Home />} />}
			<Route path="/" element={<Navigate replace to="/farmerlogin" />} />
			<Route path="/farmersignup" exact element={<Farmersignup />} />
			<Route path="/farmerlogin" exact element={<FarmerLogin />} />
			<Route path="/enthusiatssignup" exact element={<EnthusiatsSignup />} />
			<Route path="/enthusiatslogin" exact element={<EnthusiatsLogin />} />
  </div>);
}

export default App;
