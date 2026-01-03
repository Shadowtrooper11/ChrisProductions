import { useState, useEffect, useRef } from 'react'
import './MusicPlayer.css'

function MusicPlayer({ song, onClose }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef(null)
    const isDraggingRef = useRef(false)
    const progressBarRef = useRef(null)

    useEffect(() => {
        if (song && audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }, [song])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
        }
    }, [song])
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const seekToPosition = (e) => {
        const audio = audioRef.current
        const progressBar = progressBarRef.current
        if (!audio || !duration) return

        const rect = progressBar.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const width = rect.width
        const clickPercent = Math.max(0, Math.min(1, clickX / width))
        const newTime = clickPercent * duration

        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleProgressMouseDown = (e) => {
        isDraggingRef.current = true
        seekToPosition(e)
    }

    const handleProgressMouseMove = (e) => {
        if (!isDraggingRef.current) return
        seekToPosition(e)
    }

    const handleProgressMouseUp = () => {
       isDraggingRef.current = false
    }

    useEffect(() => {
        const handleMove = (e) => handleProgressMouseMove(e)
        const handleUp = () => handleProgressMouseUp()

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', handleUp)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', handleUp)
        }
    }, [duration])

    if (!song) return null

    return (
        <div className="music-player">
            <audio ref={audioRef} src={song.url} />

            <div className="player-header">
                <div className="song-icon">♪</div>
                <div className="player-info">
                    <div className="player-title">{song.title}</div>
                    <div className="player-time">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
                <button className="close-button" onClick={onClose}>x</button>
            </div>

            <div ref={progressBarRef} className="progress-bar" onClick={seekToPosition} onMouseDown={handleProgressMouseDown}> 
                <div
                    className="progress-fill"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                </div>
            </div>

            <div className="player-controls">
                <button className="control-btn">🔀</button>
                <button className="control-btn">⏮</button>
                <button className="control-btn play-pause" onClick={togglePlayPause}>
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="control-btn">⏭</button>
                <button className="control-btn">🔁</button>
            </div>    

        </div>
    )
}

export default MusicPlayer