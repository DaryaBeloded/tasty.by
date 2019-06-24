import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { loadCafe } from '../../../redux/actions';

const TopList = ({ top5, loadCafe }) => {

    const closeTop = () => {
		document.getElementsByClassName('container-main-top')[0].classList.remove("on");
        loadCafe('5ca0bf61c441182654ff16b9', 'cafe', null);
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
                        <Link className="cuisine" to="/cafe/5ca0bf61c441182654ff16b9" onClick={closeTop}>Весь список</Link>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default connect(
    (state) => ({ top5: state.top5 }),
    {
        loadCafe,
    }
)(TopList);