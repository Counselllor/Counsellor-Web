import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PageNotFound from './components/PageNotFound'

const App = () => {

  return (
    <Router>
      <div className="App">
        <Navbar/> 
      </div>

      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>  
        <Route exact path='/signup' element={<SignUp/>}></Route>  
        <Route path='*' element={<PageNotFound/>}></Route>  
      </Routes>
    </Router>
  )
}

export default App
