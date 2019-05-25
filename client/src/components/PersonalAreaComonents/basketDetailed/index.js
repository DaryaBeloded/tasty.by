import React from 'react';
import Dishes from '../dishes';
import './styles.css';

const BasketDetailed = ({ basket, orderId }) => (
  <div className="container-basket">
    <span className="title">Корзина</span>
    {
      basket.map(dish => <Dishes dish={dish} key={`${orderId}/${dish.dish._id}`} />)
    }
  </div>
);

export default BasketDetailed;