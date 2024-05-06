import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import heroimg from '../Assets/hero-img.png'
import icon2 from '../Assets/icon2.jpg'

const Hero = () => {
  return (
      <div className='hero'>
          <div className="hero-left">
              <h2>Tranding Product in 2023</h2>
                <div>
                    <div className="hand-hand-icon">
                        <p>Make Your Interior More Minimalistic & Morden</p>
                        
                    </div>
                    
              </div>
              <div className="hero-latest-btn">
                  <div>Latest Collection</div>
                  <img src={arrow_icon} alt="" />
              </div>
          </div>
              
          <div className='hero-right'>
              <img src={heroimg} alt="" />
          </div>
          
          
        </div>
  )
}

export default Hero