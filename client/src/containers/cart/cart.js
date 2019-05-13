import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/newlogo.png';
import { connect } from 'react-redux';
import { removeFromCart, clearCart, createOrder } from '../../redux/actions';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './cart.css'

class Cart extends Component {

    state = {
        startDate: new Date(),
    }

    handleChange = (date) => {
        this.setState({
            startDate: date,
        });
    }

    showFormLogin = () => {
    	document.getElementsByClassName('cover')[0].classList.add('on');
    	document.getElementsByClassName('container-order')[0].classList.add('on');
    	document.getElementsByClassName('container-list-submenu')[0].classList.remove('on');
    }

    closeFormLogin = () => {
    	document.getElementsByClassName('cover')[0].classList.remove('on');
    	document.getElementsByClassName('container-order')[0].classList.remove('on');
    }

    deleteItem = e => {
        e.stopPropagation();
        const {
            removeFromCart,
            cart,
        } = this.props;
        const food = JSON.parse(e.target.getAttribute('data-index'));
        removeFromCart(food, cart);
    }

    clearCart = () => {
        this.props.clearCart();
    }

    handleCreateOrder = e => {
        e.preventDefault();
        const name = document.getElementsByClassName('cart-name')[0].value;
        const phone = document.getElementsByClassName('login-phone')[0].value;
        const address = document.getElementsByClassName('login-delivery-address')[0].value;
        const summ = this.getTotalPrice(this.props.cart);
        const basket = [];
        this.props.cart.forEach(item => {
            basket.push({ 
                cafe_id: item.cafeId,
                dish: item._id,
                number_of_servings: item.count,
            });
        });
        const time = +this.state.startDate;
        this.props.createOrder({
            name,
            deliveryTime: time,
            address,
            phone,
            summ,
            basket: JSON.stringify(basket),
        })
    }

    getFormToOrder = () => {
        const name = this.props.user ? this.props.user.name : '';
        const phone = this.props.user ? this.props.user.phone : '';
        const address = this.props.user ? this.props.user.address : '';
        return (
            <div className="cover">
                <div className="container-order">
                    <form className="form-login" onSubmit={this.handleCreateOrder}>
                        <div className="container">
                            <div className="login-logo">
                                <img src={Logo} alt="Лого"/>
                            </div>
                            <div className="close-login">
                                <i className="fa fa-times-circle" onClick={this.closeFormLogin}></i>
                            </div>
                        </div>
                        <input className="cart-name" type="text" placeholder="Имя" defaultValue={name}/>
                        <input className="login-phone" type="text" placeholder="Телефон" defaultValue={phone} isrequired="true"/>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                            className="custom-calendar"
                        />
                        <input className="login-delivery-address" type="text" placeholder="Адрес доставки" defaultValue={address} isrequired="true"/>
                        <script type="text/javascript" charSet="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af609bc37cfcf3b103a33ff27315c3e46fdbaa227808bf7a06d7dd7a15de42d0d&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
                        <span className="total-amount">{this.getTotalPrice(this.props.cart)} р.</span>
                        <div className="container-button">
                            <button className="button-login" type="submit">Заказать!</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    getTotalPrice = array => {
        let totalPrice = 0;
        if (array !== null && array[0]) array.forEach(item => totalPrice += item.count * item.price_per_portion);
        return totalPrice.toFixed(2);
    }

    getFoods = array => {
        return array.map(food => {
            return (
                <Link 
                    to={{ 
                        pathname: `/food/${food._id}`, 
                        state: { count: food.count }, 
                    }}
                    key={food._id} 
                >
                    <div className="cart-container-food" >
                        <div className="food-image" style={{ backgroundImage: `url(${food.image})` }}></div>
                        <div className="container-about-food">
                            <div className="name-food">
                                <span className="span-name-food">{food.title}</span>
                            </div>
                            <div className="count-of-food">
                                <span>Количество:</span>
                                <span className="span-count-of-food">{food.count}</span>
                            </div>
                            <div className="total-price">
                                <span>Цена:</span>
                                <span className="span-price">{food.price_per_portion.toFixed(2)} p.</span>
                            </div>
                        </div>
                        <button data-index={JSON.stringify(food)} className="delete-this" onClick={this.deleteItem}>-</button>
                    </div>
                </Link>
            )
        })
    }

    render() {
        const foods = this.getFoods(this.props.cart);
        
        return (
            <Fragment>
                <div className="full-window">
                    <div className="cart-content">
                        <div className="cart-current-title">
                            <span className="span-current-title">Текущий заказ</span>
                        </div>
                        <div className="cart-all-food">
                            {foods}
                        </div>
                        <div className="cart-container-confirm">
                            <div className="container-clear">
                                {this.props.cart.length !== 0 ? (
                                    <button className="clear-cart" onClick={this.clearCart}>Очистить корзину</button>
                                ) : null }
                                
                            </div>
                            <div className="container-total-price">
                                <span>Общий чек</span>
                                <span className="span-total-price">{this.getTotalPrice(this.props.cart)} р.</span>
                            </div>
                            <div className="container-confirm-order">
                                {this.props.cart.length !== 0 ? (
                                    <button className="confirm" onClick={this.showFormLogin} >Оформить заказ</button>
                                ) : null }
                                
                            </div>
                        </div>
                    </div>
                </div>
                {this.getFormToOrder()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.data,
        user: state.login.data.user,
        userId: state.login.data.token,
    }
}

export default connect(
    mapStateToProps,
    {   
        removeFromCart,
        clearCart,
        createOrder,
    }
)(Cart);