import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import Loader from '../../components/Loader';
import { toggleFavorites, loadFood, addToCart, changeFoodInCart } from '../../redux/actions';
import { showModal } from '../../utils/utils';
import './food.css'

class Food extends Component {

    state = {
        count: this.props.history.location.state && this.props.history.location.state.count ? this.props.history.location.state.count : 1,
    }

    componentDidMount = () => {
        const {
            loadFood,
            history,
        } = this.props;
        loadFood(history.location.pathname.substring(6));
    }

    getTotalPrice = obj => {
        let totalPrice = 0;
        if (obj) totalPrice = this.state.count * obj.price_per_portion;
        return totalPrice.toFixed(2);
    }

    decCount = () => {
        let {
            state: {
                count,
            },
        } = this;
        if (count === 1) return
        else {
            const newCount = --count;
            this.setState({
                count: newCount,
            });
        };
    }

    incCount = () => {
        let {
            state: {
                count,
            },
        } = this;
        const newCount = ++count;
        this.setState({
            count: newCount,
        });
    };

    handleClick = ({ target }) => {
        const {
            addToCart,
            changeFoodInCart,
            cart,
            history: {
                location,
            }
        } = this.props;

        const food = JSON.parse(target.getAttribute('data-index'));
        const newFood = { ...food, count: this.state.count, cafeId: location.state ? location.state.fromCafe : undefined };
        target.outerText === 'В корзину' ? addToCart(newFood, cart) : changeFoodInCart(newFood, cart);   
        showModal('ok', 'Товар добавлен в корзину!');
    }

    toggleFavorites = ({ target }) => {
        const food = JSON.parse(target.getAttribute('data-index'));
        this.props.toggleFavorites(food);
    }

    render() {
        const {
            food: {
                data,
                isLoading,
            }
        } = this.props;

        if (isLoading) return (
            <div className="loader">
                <Loader />
            </div>
        )

        return (
            <div className="content">
                <Helmet>
                    <title>Tasty.by. {data.title} с доставкой</title>
                    <meta name="description" content="Tasty.by предоставляет возможность заказать еду с доставкой" />
                    <meta name="fragment" content="!" />
                </Helmet>
                <div className="about-content">
                    <div className="about-top-part">
                        <div className="image" style={{ backgroundImage: `url(${data.image})` }} >
                            <div className="about-bottom-part-left">
                                <i
                                    data-index={JSON.stringify(data)}
                                    className={data.favorites ? "fa fa-heart favorites" : "fa fa-heart"}
                                    onClick={this.toggleFavorites}
                                ></i>
                                <div className="rating">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <span>{data.rating ? data.rating.toFixed(1) : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <div className="title">
                                <span className="span-text-title">{data.title}</span>
                            </div>
                            <div className="about">
                                <span className="span-text-about">{data.composition}</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-bottom-part-rigth">
                        <div className="container-weight">
                            <div className="weight">
                                <span>Вес</span>
                            </div>
                            <div className="weight-value">
                                <span>{data.weight_per_portion}</span>
                            </div>
                        </div>
                        <div className="container-price">
                            <div className="text-price">
                                <span>Цена</span>
                            </div>
                            <div className="div-price">
                                <span className="span-price">{data.price_per_portion} р.</span>
                            </div>
                        </div>
                        <div className="container-count">
                            <div className="count">
                                <span>Количество</span>
                            </div>
                            <div className="inc-dec">
                                <button className="button-dec" onClick={this.decCount}>-</button>
                                <input className="input-count" type="text" value={this.state.count} disabled="disabled" />
                                <button className="button-inc" onClick={this.incCount}>+</button>
                            </div>
                        </div>
                        <div className="container-total-price">
                            <div className="text-total-price">
                                <span>Общая сумма</span>
                            </div>
                            <div className="div-total-price">
                                <span className="span-total-price">{this.getTotalPrice(data)} р.</span>
                            </div>
                        </div>
                        <div className="add-on-cart">
                            <button data-index={JSON.stringify(data)} className="button-add-on-cart" onClick={this.handleClick}>
                                {this.props.history.location.state ?  (
                                    this.props.history.location.state.hasOwnProperty('count') ? 'Сохранить' : 'В корзину'
                                    ) : 'В корзину'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        food: state.food,
        cart: state.cart.data,
    }
}

export default connect(
    mapStateToProps,
    {
        toggleFavorites,
        loadFood,
        addToCart,
        changeFoodInCart
    }
)(Food);