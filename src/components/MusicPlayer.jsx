import { useState, useEffect, useRef } from 'react'
import './MusicPlayer.css'

function MusicPlayer({ song, onClose, allSongs, onSongChange }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [loopMode, setLoopMode] = useState('none')
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

        const handleEnded = () => {
            if (loopMode === 'one') {
                audio.currentTime = 0
                audio.play()
            } else if (loopMode === 'all') {
                handleNext()
            } else {
                handleNext()
            }
        }

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [song, loopMode])

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleNext = () => {
        if (!allSongs || allSongs.length === 0) return
        const currentIndex = allSongs.findIndex(s => s.id === song.id)
        const nextIndex = (currentIndex + 1) % allSongs.length
        onSongChange(allSongs[nextIndex])
    }

    const handlePrevious = () => {
        if (!allSongs || allSongs.length === 0) return
        const currentIndex = allSongs.findIndex(s => s.id === song.id)
        const prevIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1
        onSongChange(allSongs[prevIndex])
    }

    const toggleLoop = () => {
        const modes = ['none', 'one', 'all']
        const currentIndex = modes.indexOf(loopMode)
        const nextIndex = (currentIndex + 1) % modes.length
        setLoopMode(modes[nextIndex])
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

    const getLoopIcon = () => {
        if (loopMode === 'one') return '🔂'
        if (loopMode === 'all') return '🔁'
        return '🔁'
    }

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
                <button className="control-btn" onClick={handlePrevious}>⏮</button>
                <button className="control-btn play-pause" onClick={togglePlayPause}>
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="control-btn" onClick={handleNext}>⏭</button>
                <button className={`control-btn loop-btn ${loopMode !== 'none' ? 'active' : ''}`} title={`Loop: ${loopMode}`} onClick={toggleLoop}>{getLoopIcon()}</button>
            </div>    

        </div>
    )
}

export default MusicPlayer