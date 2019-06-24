import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader';
import { loadCafe } from '../../../redux/actions';
import { showModal } from '../../../utils/utils';

class Feedback extends Component {

	state = {
		currentDesc: '',
	}

    componentDidMount = () => {
    	this.props.loadCafe('5ca0bf61c441182654ff16b9', 'cafe', null);
    }

    updateState = ({ target: { value } }) => {
    	this.setState({
    		currentDesc: this.props.cafe.data.dishes.find(dish => dish.title === value) ? this.props.cafe.data.dishes.find(dish => dish.title === value).composition : '',
    	});
    }

    handleClick = () => {
    	if (this.state.currentDesc === '' || document.getElementsByTagName('textarea')[0].value === '') {
    		return
    	}

    	showModal('ok', 'Предложение принято! Ожидайте ответ на почте в течении 24 часов.');
    }

    render() {
    	const { 
            cafe: {
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
    			<span className="title">Доступные блюда</span>
    			<select onChange={this.updateState}>
    				<option></option>
    				{
    					data.dishes.map(dish => <option key={`dish/${dish._id}`}>{dish.title}</option>)
    				}
    			</select>
    			<div className="desc">
    				<span>{this.state.currentDesc}</span>
    			</div>
    			<textarea placeholder="Добавьте или уберите компонент..." />
    			<button onClick={this.handleClick}>Отправить изменения</button>
    		</div>
    	)
    }
}

const mapStateToProps = (state) => {
    return {
        cafe: state.cafe,
    }
}

export default connect(
    mapStateToProps,
    {
    	loadCafe,
    }
)(Feedback);