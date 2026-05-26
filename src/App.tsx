import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import Navbar from './layout/Navbar/Navbar'
import MainBackround from './layout/MainBackround/MainBackround'
import Footer from './layout/Footer/Footer'
import Games from './pages/Games/Games'
import { GameServers } from './pages/GameServers/GameServers'

function App() {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <MainBackround />
        <Navbar />
        
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<Games/>} />
            <Route path="/games/:id" element={<GameServers />} />
          </Routes>
        </div>

        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App