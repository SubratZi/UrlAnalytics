import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateProject from './pages/CreateProject'
import Analytics from './pages/Analytics'
import EditProject from './pages/EditProject'

function App(){
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element ={<Home />} />
      <Route path='/create' element={<CreateProject />} />
      <Route path="/analytics/:id" element= {<Analytics />} />
      <Route path='/edit/:id' element={<EditProject/>}/>
    </Routes>
    </>
  )
}

export default App