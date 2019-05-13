import React from 'react';
import Logo from '../../../img/newlogo.png';
import { connect } from 'react-redux';
import { registration } from '../../../redux/actions';

const Registration = ({ registration }) => {

    const closeFormRegistration = () => {
		document.getElementsByClassName('cover-div')[0].classList.remove('on');
		document.getElementsByClassName('div-registration')[0].classList.remove('on');
	}

    const onRegistrationSubmit = (e) => {
		e.preventDefault();
		const name = document.getElementsByClassName('registration-name')[0].value;
		const phone = document.getElementsByClassName('registration-phone')[0].value;
		const email = document.getElementsByClassName('registration-email')[0].value;
		const password = document.getElementsByClassName('registration-password')[0].value;
		const repeatPassword = document.getElementsByClassName('registration-repeat-password')[0].value;
		name === '' || phone === '' || email === '' || password === '' || repeatPassword === '' ? (
			alert('Данные не введены')
		) : (
			password !== repeatPassword ? (
				alert('Пароли не совпадают')
			) : (
				registration({
					name,
					phone,
					email,
					password,
				})
			)
		)
	}

    return (
        <div className="div-registration">
            <form onSubmit={onRegistrationSubmit} className="form-registration">
                <div className="container">
                    <div className="registration-logo">
                        <img src={Logo} alt="Лого"/>
                    </div>
                    <div className="close-registration">
                        <i className="fa fa-times-circle" onClick={closeFormRegistration}></i>
                    </div>
                </div>
                <input className="registration-name" type="text" placeholder="Имя" required/>
                <input
                    className="registration-phone"
                    pattern="^([\+]?375|(8[\s|\-]?0))[\s|\-]?(29|33|25|44|33|17)[\s|\-]?([0-9]{3}[\s|\-]?[0-9]{2}[\s|\-]?[0-9]{2}[\s|\-]?)$"
                    type="text"
                    placeholder="Телефон: +375*********"
                    required
                />
                <input
                    className="registration-email"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                    type="text"
                    placeholder="Почта"
                    required
                />
                <input
                    className="registration-password"
                    type="password"
                    placeholder="Пароль"
                    pattern="^.{1,40}"
                    required
                />
                <input
                    className="registration-repeat-password"
                    type="password"
                    placeholder="Повторите пароль"
                    pattern="^.{1,40}"
                    required
                />
                <button className="button-registration-finally">Зарегестрироваться</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => (state);

export default connect(
    mapStateToProps,
    {
        registration,
    }
)(Registration);