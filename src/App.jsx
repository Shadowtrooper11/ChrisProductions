import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import Home from './pages/Home'
import Music from './pages/Music'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  const [currentSong, setCurrentSong] = useState(null)

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music onPlaySong={setCurrentSong} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <MusicPlayer
        song={currentSong}
        onClose={() => setCurrentSong(null)}
      />
    </div>
  )
}

export default App
