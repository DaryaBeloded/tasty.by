import React from 'react';
import Logo from '../../../img/newlogo.png';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';

const Login = ({ login }) => {
    const closeFormLogin = () => {
		document.getElementsByClassName('cover-div')[0].classList.remove('on');
		document.getElementsByClassName('div-login')[0].classList.remove('on');
	}

    const onLoginSubmit = (e) => {
		e.preventDefault();
		const email = document.getElementsByClassName('login-name')[0].value;
		const password = document.getElementsByClassName('login-password')[0].value;
		password === '' || email === '' ? (
			alert('Данные не введены!')
		) : ( 
			login(email, password)
		)
	}

    return (
        <div className="div-login">
            <form onSubmit={onLoginSubmit} className="form-login">
                <div className="container">
                    <div className="login-logo">
                        <img src={Logo} alt="Лого"/>
                    </div>
                    <div className="close-login">
                        <i className="fa fa-times-circle" onClick={closeFormLogin}></i>
                    </div>
                </div>
                <input
                    className="login-name"
                    type="text"
                    placeholder="Электронная почта"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                    required
                />
                <input
                    className="login-password"
                    type="password"
                    placeholder="Пароль"
                    pattern="[A-Za-z0-9]+"
                    required
                />
                <div className="container-button">
                    <button type="submit" className="button-login">Войти</button>
                    <button className="button-registration">Регистрация</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => (state);

export default connect(
    mapStateToProps,
    {
        login,
    }
)(Login);