import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = () => {
    const {getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);
  return (
      <div className='cartitems'>
          <div className="cartitems-format-main">
              <p>Products</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
          </div>
          <hr />
          {all_products?.map((e) => {
              if (cartItems[e.id]>0){
                return <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='carticon-product-icon'  width={85} height={320} />
                    <p className='cartitem-name'>{e.name}</p>
                      <p className='cartitem-new-price'>₹{e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p className='cartitem-allnewprice'>₹{e.new_price*cartItems[e.id]}</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
            }
            return null;
          })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtatal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shippig Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div >
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartItem;