import React from 'react'
import './Navbar.css'
// import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
// import logo_1 from '../../../../front-end/src/Components/Assets/logo_1.jpg'
// import logo_2 from '../../../../front-end/src/Components/Assets/logo_2.png'
// import logo_3 from '../../../../front-end/src/Components/Assets/logo_3.jpg'
// import logo_4 from '../../assets/logo_4.png'
// import logo_5 from '../../assets/logo_5.png'
// import logo7 from '../../assets/logo7.png'
import logo_9 from '../../assets/logo_9.png'
const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="http://localhost:5173/">
      <img src={logo_9} alt="" className='nav-logo' />
      </a>
     
      <img src={navProfile}  className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar