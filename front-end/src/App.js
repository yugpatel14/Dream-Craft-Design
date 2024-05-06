import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from "./Pages/Shop";
import ShopCategory from './Pages/ShopCategory';
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Cart from "./Pages/Cart";
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import { ShopContext } from './Context/ShopContext';
import { createContext, useEffect, useState } from 'react';
// import all_products from '../../front-end/src/Components/Assets/all_products'


export const productContext = createContext({});

const getDefaultCart = ()=> {
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
      cart[index] = 0;    
  }
  return cart;
}

function App() {

  const [all_products, set_all_products] = useState([]);

  const [cartItems, setCartItems] = useState(getDefaultCart());


  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        set_all_products(data);
      });
    
  }, []);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]+1}));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.json)
        .then((data) => console.log(data));
    }
  }
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.json)
        .then((data) => console.log(data));
    }
    
  }
  

  //Totallllllll of Amountttttttt!
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems)
    {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find((product) => product.id === Number(item))
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }
  
  //Counttttttt Carttttt Itemssssssssss!
const getTotalCartItems = () => {
  let totalItem = 0;
  for (const item in cartItems)
  {
      if (cartItems[item] > 0) {
          totalItem += cartItems[item];
      }
  }
  return totalItem;
}


  return (
    <ShopContext.Provider context={productContext} value={{getTotalCartItems,getTotalCartAmount,all_products, addToCart,removeFromCart,cartItems}}>
      <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'element={<Shop/>}/>
          <Route path='/Furniture'element={<ShopCategory banner={men_banner} category="Furniture"/>}/>
          <Route path='/Decor'element={<ShopCategory  banner={women_banner} category="Decor"/>}/>
          <Route path='/Lighting' element={<ShopCategory banner={kids_banner} category="Lighting" />} />
          <Route path="product" element={<Product />}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Login' element={<LoginSignup
          />} />
          
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
    </ShopContext.Provider>
  );
}

export default App;
