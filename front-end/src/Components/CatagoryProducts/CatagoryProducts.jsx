import React from 'react'
import './CatagoryProducts.css'
import icon1 from '../Assets/icon1.jpg'
import icon2 from '../Assets/icon2.jpg'
import icon3 from '../Assets/icon3.jpg'
import icon4 from '../Assets/icon4.jpg'
import icon5 from '../Assets/icon5.jpg'
import icon6 from '../Assets/icon6.jpg'
import icon7 from '../Assets/icon7.jpg'
import icon8 from '../Assets/icon8.jpg'
import icon9 from '../Assets/icon9.jpg'
import icon10 from '../Assets/icon10.jpg'
import icon11 from '../Assets/icon11.jpg'
import icon12 from '../Assets/icon12.jpg'

const CatagoryProducts = () => {
  return (
      <div className='catagory-products-container'>
          
          <div className='catagory-products'>
          <a href="Sofa Sets">
        <img className='beds-menu' src={icon1} alt="" />
        <p class="beds-text-menu">Sofa Sets</p>
    </a>
          <a href="Beds">
        <img className='beds-menu' src={icon2} alt="" />
        <p class="beds-text-menu">Beds</p>
    </a>
          <a href="Dining Table Sets">
        <img className='beds-menu' src={icon3} alt="" />
        <p class="beds-text-menu">Dining Table Sets</p>
    </a>
          <a href="Sofa Cum Beds">
        <img className='beds-menu' src={icon4} alt="" />
        <p class="beds-text-menu">Sofa Cum Beds</p>
    </a>
          <a href="Lamps & Lightings">
        <img className='beds-menu' src={icon5} alt="" />
        <p class="beds-text-menu">Lamps & Lightings</p>
    </a>
          <a href="Study Tables">
        <img className='beds-menu' src={icon6} alt="" />
        <p class="beds-text-menu">Study Tables</p>
          </a>
          </div>
          

          <div className='catagory-products'>
          <a href="Book Shelves">
        <img className='beds-menu' src={icon7} alt="" />
        <p class="beds-text-menu">Book Shelves</p>
              </a>
              <a href="Coffee Tables">
        <img className='beds-menu' src={icon8} alt="" />
        <p class="beds-text-menu">Coffee Tables</p>
              </a>
              <a href="Home Furnishing">
        <img className='beds-menu' src={icon9} alt="" />
        <p class="beds-text-menu">Home Furnishing</p>
              </a>
              <a href="TV Units">
        <img className='beds-menu' src={icon10} alt="" />
        <p class="beds-text-menu">TV Units</p>
              </a>
              <a href="Home Decor">
        <img className='beds-menu' src={icon11} alt="" />
        <p class="beds-text-menu">Home Decor</p>
              </a>
              <a href="Sale">
        <img className='beds-menu' src={icon12} alt="" />
        <p class="beds-text-menu">Sale</p>
          </a>
       </div>
    </div>
  )
}

export default CatagoryProducts