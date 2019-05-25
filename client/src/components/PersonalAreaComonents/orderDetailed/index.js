import React from 'react';
import './styles.css';

const OrderDetailed = ({ orderInfo, handleClick, handleShowPopup }) => {
  const createOrder = () => {
    handleClick(orderInfo);
    handleShowPopup();
  }

  const orderDate = {
    day: new Date(orderInfo.order_date).getDate() < 10 ?  `0${new Date(orderInfo.order_date).getDate()}` : new Date(orderInfo.order_date).getDate(),
    month: new Date(orderInfo.order_date).getMonth() + 1 < 10 ?  `0${new Date(orderInfo.order_date).getMonth()}` : new Date(orderInfo.order_date).getMonth() + 1,
    year: new Date(orderInfo.order_date).getFullYear(),
    hours: new Date(orderInfo.order_date).getHours() < 10 ?  `0${new Date(orderInfo.order_date).getHours()}` : new Date(orderInfo.order_date).getHours(),
    minutes: new Date(orderInfo.order_date).getMinutes() < 10 ?  `0${new Date(orderInfo.order_date).getMinutes()}` : new Date(orderInfo.order_date).getMinutes(),
    seconds: new Date(orderInfo.order_date).getSeconds() < 10 ?  `0${new Date(orderInfo.order_date).getSeconds()}` : new Date(orderInfo.order_date).getSeconds(),
  }

  const deliveryTime = {
    day: new Date(+orderInfo.delivery_time).getDate() < 10 ?  `0${new Date(+orderInfo.delivery_time).getDate()}` : new Date(+orderInfo.delivery_time).getDate(),
    month: new Date(+orderInfo.delivery_time).getMonth() + 1 < 10 ?  `0${new Date(+orderInfo.delivery_time).getMonth()}` : new Date(+orderInfo.delivery_time).getMonth() + 1,
    year: new Date(+orderInfo.delivery_time).getFullYear(),
    hours: new Date(+orderInfo.delivery_time).getHours() < 10 ?  `0${new Date(+orderInfo.delivery_time).getHours()}` : new Date(+orderInfo.delivery_time).getHours(),
    minutes: new Date(+orderInfo.delivery_time).getMinutes() < 10 ?  `0${new Date(+orderInfo.delivery_time).getMinutes()}` : new Date(+orderInfo.delivery_time).getMinutes(),
    seconds: new Date(+orderInfo.delivery_time).getSeconds() < 10 ?  `0${new Date(+orderInfo.delivery_time).getSeconds()}` : new Date(+orderInfo.delivery_time).getSeconds(),
  }

  return (
    <div className="container-order-detailed">
      <span className="title">Заказ</span>
      <div className="order-desc">
        <span>{orderInfo.name}</span>
        <span>Время заказа</span>
        <span>{`${orderDate.day}.${orderDate.month}.${orderDate.year}, ${orderDate.hours}:${orderDate.minutes}:${orderDate.seconds}`}</span>
        <span>Время доставки</span>
        <span>{`${deliveryTime.day}.${deliveryTime.month}.${deliveryTime.year}, ${deliveryTime.hours}:${deliveryTime.minutes}:${deliveryTime.seconds}`}</span>
        <span>{orderInfo.address}</span>
        <span>{orderInfo.phone}</span>
        <span>{orderInfo.summ.toFixed(2)} р.</span>
        <button type="button" onClick={createOrder}>Повторить заказ</button>
      </div>
    </div>
  )
};

export default OrderDetailed;