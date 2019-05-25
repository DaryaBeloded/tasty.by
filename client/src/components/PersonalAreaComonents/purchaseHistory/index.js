import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHistory, createOrder } from '../../../redux/actions';
import OrderDetailed from '../orderDetailed';
import BasketDetailed from '../basketDetailed';
import DatePicker from 'react-datepicker';
import Logo from '../../../img/newlogo.png';
import Loader from '../../Loader';
import './styles.css';

class PurchaseHistory extends Component {
    state = {
        startDate: new Date(),
        order: null,
    };

    handleChange = (date) => {
        this.setState({
            startDate: date,
        });
    };

    handleCreateOrder = e => {
        e.preventDefault();
        const name = document.getElementsByClassName('cart-name')[0].value;
        const phone = document.getElementsByClassName('login-phone')[0].value;
        const address = document.getElementsByClassName('login-delivery-address')[0].value;
        const summ =  this.state.order.summ;
        const basket = this.state.order.basket;
        const time = +this.state.startDate;
        this.props.createOrder({
            name,
            deliveryTime: time,
            address,
            phone,
            summ,
            basket: JSON.stringify(basket),
        })
    };

    showFormLogin = () => {
        document.getElementsByClassName('cover')[0].classList.add('on');
        document.getElementsByClassName('container-order')[0].classList.add('on');
        document.getElementsByClassName('container-list-submenu')[0].classList.remove('on');
    };

    closeFormLogin = () => {
        document.getElementsByClassName('cover')[0].classList.remove('on');
        document.getElementsByClassName('container-order')[0].classList.remove('on');
    };

    componentDidMount = () => {
        this.props.loadHistory();
    };

    getFormToOrder = (order) => {
        if (order) {
            this.setState(prevState => ({
                ...prevState,
                order, 
            }));
        } 
        const name = this.props.user ? this.props.user.name : '';
        const phone = this.props.user ? this.props.user.phone : '';
        const address = this.props.user ? this.props.user.address : '';
        return (
            <div className="cover">
                <div className="container-order">
                    <form className="form-login" onSubmit={this.handleCreateOrder}>
                        <div className="container">
                            <div className="login-logo">
                                <img src={Logo} alt="Лого" />
                            </div>
                            <div className="close-login">
                                <i className="fa fa-times-circle" onClick={this.closeFormLogin}></i>
                            </div>
                        </div>
                        <input className="cart-name" type="text" placeholder="Имя" defaultValue={name} />
                        <input className="login-phone" type="text" placeholder="Телефон" defaultValue={phone} isrequired="true" />
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
                        <input className="login-delivery-address" type="text" placeholder="Адрес доставки" defaultValue={address} isrequired="true" />
                        <script type="text/javascript" charSet="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af609bc37cfcf3b103a33ff27315c3e46fdbaa227808bf7a06d7dd7a15de42d0d&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
                        <span className="total-amount">{this.state.order ? this.state.order.summ : null} р.</span>
                        <div className="container-button">
                            <button className="button-login" type="submit">Заказать!</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    render() {
        const {
            ordersHistory: {
                isLoading,
                data,
            }
        } = this.props;

        if (isLoading) {
            return (
                <div className="loader">
                    <Loader color={'white'} />
                </div>
            )
        }

        return (
            <div className="history-content">
                {
                    data.map(order => (
                        <div className="row-content" key={order._id}>
                            <OrderDetailed orderInfo={order} handleClick={this.getFormToOrder} handleShowPopup={this.showFormLogin} />
                            <BasketDetailed basket={order.basket} orderId={order._id} />
                        </div>
                    ))
                }
                {this.getFormToOrder()}
            </div>
        )
    }
};

export default connect(
    (state) => ({
        ordersHistory: state.history,
        user: state.login.data.user,
        userId: state.login.data.token,
    }),
    {
        createOrder,
        loadHistory,
    }
)(PurchaseHistory);