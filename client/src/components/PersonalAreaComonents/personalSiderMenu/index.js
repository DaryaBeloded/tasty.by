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
    let feedbackClassName = 'feedback';
    let groupsClassName = 'groups';


    switch (history.location.pathname) {
        case '/personal-area/data':
            dataClassName = 'data active';
            historyClassName = 'history';
            favoritesClassName = 'favorites';
            feedbackClassName = 'feedback';
            groupsClassName = 'groups';
            break;

        case '/personal-area/history':
            dataClassName = 'data';
            historyClassName = 'history active';
            favoritesClassName = 'favorites';
            feedbackClassName = 'feedback';
            groupsClassName = 'groups';
            break;

        case '/personal-area/favorites':
            dataClassName = 'data';
            historyClassName = 'history';
            favoritesClassName = 'favorites active';
            feedbackClassName = 'feedback';
            groupsClassName = 'groups';
            break;

        case '/personal-area/feedback':
            dataClassName = 'data';
            historyClassName = 'history';
            favoritesClassName = 'favorites';
            feedbackClassName = 'feedback active';
            groupsClassName = 'groups';
            break;

        case '/personal-area/groups':
            dataClassName = 'data';
            historyClassName = 'history';
            favoritesClassName = 'favorites';
            feedbackClassName = 'feedback';
            groupsClassName = 'groups active';
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
                <div className={feedbackClassName}>
                    <Link
                        to="/personal-area/feedback"
                        onClick={handleClick}
                        className="personalarea-title"
                    >
                        Изменить блюдо
                    </Link>
                </div>
                <div className={groupsClassName}>
                    <Link
                        to="/personal-area/groups"
                        onClick={handleClick}
                        className="personalarea-title"
                    >
                        Группы
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PersonalSiderMenu;