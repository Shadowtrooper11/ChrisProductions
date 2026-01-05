import './Home.css'

function Home() {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-image">
                    <img src="./hero.png" alt="Musician Icon" className="hero-icon" />
                </div>

                <div className="hero-content">
                    <h1>Chris Productions</h1>
                    <p className="hero-about">
                        Welcome to my official website!<br /> I'm Chris, a passionate musician and producer dedicated to creating captivating soundscapes and memorable melodies. <br /> Explore my music, learn about my journey, and get in touch for collaborations or bookings.
                    </p>
                </div>
            </section>        
        </div>
    )
}

export default Home