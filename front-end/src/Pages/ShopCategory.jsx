import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
import { productContext } from '../App';

const ShopCategory = (props) => {
  // const { all_products } = useContext(productContext);
  const [all_products, setAllProducts] = useState([]);

  const productCategory = props.category;

  useEffect(() => {
    console.log("productCategory", productCategory);
    fetch("http://localhost:4000/products/" + productCategory)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
    console.log(all_products);
  }, []);
  return (
      <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 product
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products?.map((item, i) => {
          if (props.category===item.category) {
            return (<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />)
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
        </div>
    </div>
  )
}

export default ShopCategory;