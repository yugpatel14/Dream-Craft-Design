import { useContext, useEffect, useRef, useState } from "react";
import './Navbar.css'
import logo_9 from '../Assets/logo_9.png';
import cart_icon from '../Assets/cart_icon.png'
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png'


const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext)
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }


    return (
    
      <div className='navbar'>
       
        <div className="nav-logo">
        <a href="http://localhost:3000/">
        <img src={logo_9} alt=""/>

        </a>
       
      </div>

      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />

    
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr />:<></>}</li>
        <li onClick={()=>setMenu("Furniture")}><Link style={{textDecoration:'none'}} to='/Furniture'>Furniture</Link>{menu==="Furniture"?<hr />:<></>}</li>
        <li onClick={()=>setMenu("Decor")}><Link style={{textDecoration:'none'}} to='/Decor'>Decor</Link>{menu==="Decor"?<hr />:<></>}</li>
        <li onClick={()=>setMenu("Lighting")}><Link style={{textDecoration:'none'}} to='/Lighting'>Lighting</Link>{menu==="Lighting"?<hr />:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem("auth-token");window.location.replace('/')}}>Logout</button>:<Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>

      </div>
  )
}

export default Navbar
