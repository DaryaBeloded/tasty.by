import React from 'react';
import { connect } from 'react-redux';
import { loadCafe } from '../../../redux/actions';

const Items = props => {

    const {
        item: {
            cafe,
            _id,
        },
        loadCafe,
        history,
        filter,
    } = props;

    const handleClick = (cafe, filterId) => {
        loadCafe(cafe._id, filter, filterId);
        history.push(`/cafe/${cafe._id}`);
    }

    return cafe.map(item => {
        return (
            <div className="cafe" key={cafe._id} onClick={() => handleClick(item, _id)}>
                <div className="img-container">
                    <img src={item.image} alt={item.alt_img}/>
                </div>
                <div className="description">
                    <span>{item.title}</span>
                    <span>Время работы: {item.delivery}</span>
                    <span>Среднее время доставки: {item.delivery_time}</span>
                    <span>Стоимость доставик: {item.delivery_price}</span>
                </div>
            </div>
        )
    })
}

const mapStateToProps = (state) => {
    return {
        cafe: state.cafe,
    }
}

export default connect(
    mapStateToProps,
    {
        loadCafe,
    }
)(Items);