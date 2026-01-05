import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { songs } from './data/Songs'
import AnimatedBackground from './components/AnimatedBackground'
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
      <AnimatedBackground />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music onPlaySong={setCurrentSong} currentSong={currentSong} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <MusicPlayer
        song={currentSong}
        onClose={() => setCurrentSong(null)}
        allSongs={songs}
        onSongChange={setCurrentSong}
      />
    </div>
  )
}

export default App
