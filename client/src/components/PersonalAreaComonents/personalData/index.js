import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions';

const PersonalData = ({ updateUser }) => {

    const user = JSON.parse(localStorage.getItem('user')).user;

    const handleClick = (e) => {
        e.preventDefault();
        const name = document.getElementsByClassName("name-value")[0].value;
        const phone = document.getElementsByClassName("name-phone")[0].value;
        const address = document.getElementsByClassName("name-address")[0].value;
        const email = document.getElementsByClassName("name-email")[0].value;
        updateUser({ 
            name, 
            phone, 
            address, 
            email, 
        })
    }

    return (
        <div className="personal-data-content">
            <form onSubmit={handleClick} className="form-personalarea">
                <div className="container">
                    <div className='name'>
                        <span>Имя*</span>
                        <input className="name-value" required type="text" defaultValue={user.name}/>
                    </div>
                    <div className='phone'>
                        <span>Номер телефона*</span>
                        <input className="name-phone" required type="text" defaultValue={user.phone}/>
                    </div>
                    <div className='locate'>
                        <span>Адрес</span>
                        <input className="name-address" type="text" defaultValue={user.address}/>
                    </div>  
                    <div className='email'>
                        <span>Электронная почта*</span>
                        <input className="name-email" required type="text" defaultValue={user.email}/>
                    </div>
                    <div className="note">
                        <span>* - поле является обязательным</span>
                    </div>
                </div>
                <div className='save'>
                    <button type="submit">Сохранить изменения</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(
    mapStateToProps,
    {
        updateUser,
    }
)(PersonalData);