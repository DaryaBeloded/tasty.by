import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader';
import { loadCuisines } from '../../../redux/actions';
import { showModal } from '../../../utils/utils';

class Feedback extends Component {

	state = {
		numberOfMens: 0,
        messages: [],
	}

    componentDidMount = () => {
    	this.props.loadCuisines();
    }

    updateState = ({ target: { value } }) => {
        this.setState({
            numberOfMens: value === '' ? 0 : Math.floor(Math.random() * 100),
            messages: [],
        })
    }

    handleKeyDown = ({ keyCode }) => {
        if (keyCode === 13) {
            this.publishMessage();
        }
    }

    publishMessage = () => {
        if (document.getElementsByTagName('input')[7].value === '' || document.getElementsByTagName('select')[0].value === '') return;

        let newMessages = this.state.messages;

        const hours = new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours();
        const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
        const seconds = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();
        const time = {
            hours,
            minutes,
            seconds,
        };
        const text = document.getElementsByTagName('input')[7].value;


        newMessages.push({ time, text });


        this.setState({
            messages: newMessages,
        }); 

        document.getElementsByTagName('input')[7].value = '';
    }

    render() {
    	const { 
            cuisines: {
                data,
                isLoading,
            },
         } = this.props;

    	if (isLoading) {
            return (
                <div className="loader">
                    <Loader color={'white'}/>
                </div>
            )
        }
 
    	return (
    		<div className="feedback-container">
    			<select onChange={this.updateState}>
                    <option></option>
                    {
                        data.map(cuisine => <option key={`cuisines/${cuisine._id}`}>{cuisine.name}</option>)
                    }
                </select>
                <span className="title">{`Онлайн: ${this.state.numberOfMens}`}</span>
                <div className="chat">
                    {
                        this.state.messages.map((message, index) => 
                            <span key={`message/${index}`} className="message">
                                {`${message.text}, ${message.time.hours}:${message.time.minutes}:${message.time.seconds}`}
                            </span>)
                    }
                </div>
                <input onKeyDown={this.handleKeyDown} placeholder="Сообщение..." />
                <button onClick={this.publishMessage}>Отправить</button>
    		</div>
    	)
    }
}

const mapStateToProps = (state) => {
    return {
        cuisines: state.cuisines,
    }
}

export default connect(
    mapStateToProps,
    {
    	loadCuisines,
    }
)(Feedback);