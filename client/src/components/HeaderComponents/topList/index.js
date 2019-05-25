import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';

const TopList = ({ top5 }) => {

    const closeTop = () => {
		document.getElementsByClassName('container-main-top')[0].classList.remove("on");
	}
    return (
        <div className="container-main-top">
            <div className="back" onClick={closeTop}>
                <span>Назад</span>
            </div>
            <div className="container-top">
                <div className="content-top">
                    <span>Топ-5 кафе-ресторанов</span>
                    <ul>
                        {
                            top5.data.cafes ? (
                                top5.data.cafes.map(cafe => <li key={cafe._id}>{cafe.title}</li>)
                            ) : (
                                <Loader />
                            )
                        }
                        <Link className="cafe" to="/cafes" onClick={closeTop}>Весь список</Link>
                    </ul>
                </div>
            </div>
            <div className="container-top">
                <div className="content-top">
                    <span>Топ-5 категорий</span>
                    <ul>
                        {
                            top5.data.categories ? (
                                top5.data.categories.map(category => <li key={category._id}>{category.title}</li>)
                            ) : (
                                <Loader />
                            )
                        }
                        <Link className="cuisine" to="/categories" onClick={closeTop}>Весь список</Link>
                    </ul>
                </div>
            </div>
            <div className="container-top">
                <div className="content-top">
                    <span>Топ-5 кухонь</span>
                    <ul>
                        {
                            top5.data.cuisines ? (
                                top5.data.cuisines.map(cuisine => <li key={cuisine._id}>{cuisine.title}</li>)
                            ) : (
                                <Loader />
                            )
                        }
                        <Link className="food" to="/cuisines" onClick={closeTop}>Весь список</Link>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default connect(
    (state) => ({ top5: state.top5 }),
)(TopList);