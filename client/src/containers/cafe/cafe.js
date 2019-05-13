import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import './cafe.css';

class Cafe extends Component {

    getFoods = (foods, _id) => {
        return foods.map((food, index) => {
            return (
                <div className="card-food" key={index}>
                    <Link to={{ pathname: `/food/${food._id}`, state: { fromCafe: _id } }}>
                        <img className="img" alt={food.title} src={food.image} />
                    </Link>
                    <div className="food-info">
                        <div className="main-info">
                            <span>{food.title}</span>
                            <span>{+food.price_per_portion} р.</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    getCuisine = ({ dishes, _id }) => {

        const array = [];

        const field = dishes[0].hasOwnProperty('category') ? 'category' : 'cuisine';

        const set = new Set(dishes.map(item => item[field]));

        set.forEach(item => array.push({ title: item, foods: [] }));   

        dishes.forEach(item => array[array.findIndex(elem => elem.title === item[field])].foods.push(item));
        
        return array.map(item => {
            return (
                <Fragment>
                    <div className="filter">
                        <span>{`${item.title} / ${this.props.globalFilter.data}`}</span>
                    </div>
                    <div className="cafe-foods">
                        {this.getFoods(item.foods, _id)}
                    </div>
                </Fragment>
            )
        })
    }

    render() {

        const {
            cafe: {
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
            <main className="wrapper-cafe">
                <div className='container-cafe'>
                    <div className="info top-row">
                        <div className="img-container">
                            <img src={data.image} alt={data.alt} />
                        </div>
                        <div className="container-description">
                            <span className="cafe-title">{data.title}</span>
                            <div className="cafe-desc">
                                <span className="cafe-cuisine">Кухни: {data.cuisines ? data.cuisines.map(item => item.title) : null}</span>
                                <span className="cafe-time">Время работы: {data.delivery}</span>
                                <span className="cafe-delivery">Доставка: {data.delivery_time}</span>
                                <span className="cafe-address">Адрес: {data.address ? data.address.map(item => item) : null}</span>
                                <span className="cafe-phone">Телефон: {data.phone}</span>
                                <span className="cafe-link">Сайт:
                                    <a
                                        href={data.link}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        {data.link}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-dishes">
                    {this.getCuisine(data)}
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cafe: state.cafe,
        globalFilter: state.filter,
    }
}

export default connect(
    mapStateToProps,
)(Cafe)