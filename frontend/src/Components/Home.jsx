import React from 'react'
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
    return <div className='home-page'>
        <Navbar/>
        <div className='home-container'>
            <div className='home-blurb'>
                <div className='first-lines'>
                    <h1 className='about-blurb'>Protect your community.</h1>
                    <h1 className='about-blurb'></h1>
                </div>
                <h2>Local neighborhood environmental reporting, made simple.</h2>
                <div className="get-started">
                    <button>Get Started</button>
                </div>
            </div>
        </div>
    </div>
    
}

export default Home