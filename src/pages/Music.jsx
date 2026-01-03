import { useState } from 'react'
import './Music.css'

function Music({ onPlaySong }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAlbum, setSelectedAlbum] = useState([])

    const songs = [
        { 
            id: 1, 
            title: 'Chase Music',
            tags: ['Orchestral', 'Epic', 'Action'],
            album: 'Light of the Lost',
            duration: "3:45",
            url: "https://pub-02e77316cbe24c94aa351b188394e94d.r2.dev/Chase%20LOTL(1).mp3"
        },
        {
            id: 2, 
            title: 'Light of the Lost Titles Version 1',
            tags: ['Orchestral', 'Emotional', 'Calm'],
            album: 'Light of the Lost',
            duration: "2:30",
            url: "https://pub-02e77316cbe24c94aa351b188394e94d.r2.dev/Light%20of%20the%20Lost.mp3"
        },
        {
            id: 3,
            title: 'Light of the Lost Titles Version 2',
            tags: ['Orchestral', 'Emotional'],
            album: 'Light of the Lost',
            duration: "4:15",
            url: "https://pub-02e77316cbe24c94aa351b188394e94d.r2.dev/Light%20of%20the%20Lost%20Main%20Titles(2).mp3"
        }
    ]

    const albums = ["Warfront", "Light of the Lost", "Orchestral"]
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
                        <div key="{song.id}" className="song-card">
                            <div className="song-icon">♪</div>
                            <div className="song-details">
                                <h4 className="song-title">{song.title}</h4>
                                <div className="song-tags">{song.tags.map(tag => (
                                    <span key={tag} className="song-tag">{tag}</span>
                                ))}
                                </div>
                            </div>

                            <button className="play-btn-card" onClick={() => onPlaySong(song)}>▶</button>

                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Music