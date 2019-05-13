import React from 'react';

const FavoriteItem = ({item, toggleFavorites}) => (
    <div className="container">
        <div className="img">
            <img src={item.image} alt={item.alt_img} />
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
)

export default FavoriteItem;