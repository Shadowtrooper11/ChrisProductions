import { useState } from 'react'
import { songs, albums } from '../data/Songs'
import './Music.css'

function Music({ onPlaySong }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAlbum, setSelectedAlbum] = useState([])

    const displayedSongs = songs 

    return (
        <div className="music-page">
            <main className="music-content">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search songs..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="song-list">
                    {displayedSongs.map(song => (
                        <div key={song.id} className="song-card">
                            <div className="song-icon">♪</div>
                            <div className="song-details">
                                <h4 className="song-title">{song.title}</h4>
                                <div className="song-tags">{song.tags.map(tag => (
                                    <span key={tag} className="song-tag">{tag}</span>
                                ))}
                                </div>
                            </div>

                            <div className="song-actions">
                                <span className="song-duration">{song.duration}</span>
                                <button className="play-btn-card" onClick={() => onPlaySong(song)}>▶</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Music