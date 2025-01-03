import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from './pages/Home' 
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import Admin from "./pages/Admin"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route element={<PrivateRoute />}>
       <Route path="/profile" element={<Profile />} />
       <Route path="/admin-dashboard" element={<Admin/>} />
      </Route>

   </Routes>

    </BrowserRouter>
  )
}
