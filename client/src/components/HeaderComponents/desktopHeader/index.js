import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../img/newlogo.png';
import { connect } from 'react-redux';
import { logout, loadTop5 } from '../../../redux/actions';

const DesktopHeader = ({ auth, logout, loadTop5 }) => {

    const showTop = () => {
        document.getElementsByClassName('container-main-top')[0].classList.add("on");
        loadTop5();
    }

    const showFormLogin = () => {
        document.getElementsByClassName('cover-div')[0].classList.add('on');
        document.getElementsByClassName('div-login')[0].classList.add('on');
        document.getElementsByClassName('container-list-submenu')[0].classList.remove('on');
        document.getElementsByClassName('login-name')[0].value = "";
    }

    const showFormRegistration = () => {
        document.getElementsByClassName('cover-div')[0].classList.add('on');
        document.getElementsByClassName('div-registration')[0].classList.add('on');
        document.getElementsByClassName('container-list-submenu')[0].classList.remove('on');
    }

    const handleCLick = () => {
        if (
            window.location.pathname === '/personal-area/data' || 
            window.location.pathname === '/personal-area/history' || 
            window.location.pathname === '/personal-area/favorites'
        ) window.location.pathname = '/';
        logout();
    }

    return (
        <div className="full-header">
            <div className="logo">
                <Link to='/'>
                    <img src={Logo} alt="Лого"/>
                </Link>
            </div>
            <div className="container-list">
                <ul className="list">
                    <li>
                        <Link className="cafes" to='/cafes'>Кафе</Link>
                    </li>
                    <li>
                        <Link className="categories" to='/categories'>Категории</Link>
                    </li>
                    <li>
                        <Link className="cuisines" to='/cuisines'>Кухни</Link>
                    </li>
                    <li>
                        <span className="show-top" onClick={showTop}>Топ-5</span>
                    </li>
                </ul>
            </div>
            <div className="cart">
                <Link to="/cart">
                    <i className="fa fa-cart-plus"></i>
                </Link>
            </div>
            <div className="container-login-logout">
                {auth ? (
                    <Fragment>
                        <Link to='/personal-area/data'>Личный кабинет</Link>
                        <span>|</span>
                        <span onClick={handleCLick}>Выход</span>
                    </Fragment>
                ) : (
                    <Fragment>
                        <span className="login" onClick={showFormLogin}>Вход</span>
                        <span>|</span>
                        <span className="registration" onClick={showFormRegistration}>Регистрация</span>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (state.login)

export default connect(
    mapStateToProps,
    {
        logout,
        loadTop5,
    }
)(DesktopHeader);