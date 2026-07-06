import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateProject from './pages/CreateProject'
import Analytics from './pages/Analytics'
import EditProject from './pages/EditProject'
import Login from './pages/Login'
import Register from './pages/Register'


const isAuthenticated = () => !!localStorage.getItem('token')

function ProtectedRoute({children}){
  return isAuthenticated() ? children: <Navigate to= "/login" />
}

function GuestRoute ({children}){
  return !isAuthenticated() ? children: <Navigate to="/" />
}

function App(){
  const location = useLocation()
  const guestPages = ['/login', '/register']
  const showNavbar = isAuthenticated() && !guestPages.includes(location.pathname)
  return(
    <>
    {showNavbar && <Navbar />}
    <Routes>
      <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
      <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
      <Route path='/' element ={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/create' element ={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
      <Route path="/analytics/:id" element ={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path='/edit/:id' element ={<ProtectedRoute><EditProject /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App