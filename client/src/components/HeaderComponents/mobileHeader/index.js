import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../img/newlogo.png';
import { connect } from 'react-redux';
import { logout, clearCart, loadTop5 } from '../../../redux/actions';

const MobileHeader = props => {

    const {
        auth,
        logout,
        clearCart,
        loadTop5,
    } = props;

    const showTop = () => {
        document.getElementsByClassName('container-main-top')[0].classList.add("on");
        loadTop5();
    }

    const showMenu = () => {
        document.getElementsByClassName('container-list-submenu')[0].classList.toggle('on');
    }

    const showFormLogin = () => {
        document.getElementsByClassName('cover-div')[0].classList.add('on');
        document.getElementsByClassName('div-login')[0].classList.add('on');
        document.getElementsByClassName('container-list-submenu')[0].classList.remove('on');
        document.getElementsByClassName('login-name')[0].value = "";
        document.getElementsByClassName('login-name')[0].value = "";
    }

    const showFormRegistration = () => {
        document.getElementsByClassName('cover-div')[0].classList.add('on');
        document.getElementsByClassName('div-registration')[0].classList.add('on');
        document.getElementsByClassName('container-list-submenu')[0].classList.remove('on');
    }

    const handleClick = () => {
        if (
            window.location.pathname === '/personal-area/data' || 
            window.location.pathname === '/personal-area/history' || 
            window.location.pathname === '/personal-area/favorites'
        ) window.location.pathname = '/';
        logout();
        clearCart();
    }

    return (
        <div className="small-header">
            <div className="logo">
                <Link to='/'>
                    <img src={Logo} alt="Лого"/>
                </Link>
            </div>
            <div className="container-list-submenu">
                <ul className="list-submenu">
                    <li>
                        <Link className="cafes" to='/cafes'>Наши кафе</Link>
                    </li>
                    <li><hr /></li>
                    <li>
                        <span className="showtop" onClick={showTop}>Топ-5</span>
                    </li>
                    <li><hr /></li>
                    <li>
                        <Link to="/cart">Корзина</Link>
                    </li>
                    <li><hr /></li>
                    <li>
                        {auth ? (
                            <Link to='/personal-area/data'>Личный кабинет</Link>
                        ) : (
                                <span className="submenu-login" onClick={showFormLogin}>Вход</span>
                            )
                        }
                    </li>
                    <li><hr /></li>
                    <li>
                        {auth ? (
                            <span onClick={handleClick}>Выход</span>
                        ) : (
                                <span className="submenu-registration" onClick={showFormRegistration}>Регистрация</span>
                            )
                        }
                    </li>
                </ul>
            </div>
            <div className="bar" onClick={showMenu}>
                <i className="fas fa-bars"></i>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => (state)

export default connect(
    mapStateToProps,
    {
        logout,
        clearCart,
        loadTop5,
    }
)(MobileHeader);