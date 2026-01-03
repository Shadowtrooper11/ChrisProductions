import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './AnimatedBackground.css'

function AnimatedBackground() {
    const location = useLocation()
    const [rotation, setRotation] = useState(0)

    const rotations = {
        '/': 0,
        '/music': 90,
        '/about': -90,
        '/contact': 180,
    }

    useEffect(() => {
        setRotation(rotations[location.pathname] || 0)
    }, [location.pathname])

    return (
        <div className="animated-background" style={{'--rotation': `${rotation}deg` }} />
    )
}

export default AnimatedBackground