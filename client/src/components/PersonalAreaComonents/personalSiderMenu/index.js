import React from 'react';
import { Link } from 'react-router-dom';

const PersonalSiderMenu = ({ history }) => {

    const handleClick = ({ target }) => {
        document.getElementsByClassName('data')[0].classList.remove('active');
        document.getElementsByClassName('history')[0].classList.remove('active');
        document.getElementsByClassName('favorites')[0].classList.remove('active');
        target.parentNode.classList.toggle('active');
    }

    let dataClassName = 'data';
    let historyClassName = 'history';
    let favoritesClassName = 'favorites';


    switch (history.location.pathname) {
        case '/personal-area/data':
            dataClassName = 'data active';
            historyClassName = 'history';
            favoritesClassName = 'favorites';
            break;

        case '/personal-area/history':
            dataClassName = 'data';
            historyClassName = 'history active';
            favoritesClassName = 'favorites';
            break;

        case '/personal-area/favorites':
            dataClassName = 'data';
            historyClassName = 'history';
            favoritesClassName = 'favorites active';
            break;

        default: return 'data active';
    }

    return (
        <div className="personalarea-menu">
            <div className="personalarea-info">
                <div className={dataClassName}>
                    <Link
                        to="/personal-area/data"
                        onClick={handleClick}
                        className="personalarea-title"
                    >
                        Личные данные
                    </Link>
                </div>
                <div className={historyClassName}>
                    <Link
                        to="/personal-area/history"
                        onClick={handleClick}
                        className="personalarea-title"
                    >
                        История заказов
                    </Link>
                </div>
                <div className={favoritesClassName}>
                    <Link
                        to="/personal-area/favorites"
                        onClick={handleClick}
                        className="personalarea-title"
                    >
                        Избранное
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PersonalSiderMenu;