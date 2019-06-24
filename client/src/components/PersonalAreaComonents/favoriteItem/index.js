import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteItem = ({item, toggleFavorites}) => (
    <Link to={{ pathname: `/food/${item._id}` }}>
        <div className="container">
            <div className="img" style={{ backgroundImage: `url(${item.image})` }}>
            </div>
            <div className="description">
                <span className="title">{item.title}</span>
                <span className="text">{item.composition}</span>
                <span className="price">Цена: {item.price_per_portion} р.</span>
                <span className="price">Вес: {item.weight_per_portion} р.</span>
            </div>
            <i
                data-index={JSON.stringify(item)}
                className={"fa fa-heart favorites"}
                onClick={toggleFavorites}
            ></i>
        </div>
    </Link>
)

export default FavoriteItem;