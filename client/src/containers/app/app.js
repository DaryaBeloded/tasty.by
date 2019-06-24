import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../header';
import Footer from '../../components/Footer';
import Main from '../main';
import Cart from '../cart';
import Food from '../food';
import Cafes from '../cafes';
import Cafe from '../cafe'
import Categories from '../categories';
import Cuisine from '../cuisine';
import PersonalArea from '../personalArea';
import { loadTop } from '../../redux/actions';
import './app.css'

class App extends Component {

	componentDidMount = () => {
		this.props.loadTop();
	}

	render() {
		return (
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/cafes' 
						component={Cafes} 
						history={this.props.history}
					/>
					<Route path='/categories' 
						component={Categories}
						history={this.props.history} 
					/>
					<Route path='/cuisines' 
						component={Cuisine}
						history={this.props.history}
					/>
					<Route path='/cart' 
						component={Cart}
						history={this.props.history}
					/>
					<Route path='/cafe/:id' 
						component={Cafe}
						history={this.props.history}
					/>
					<Route path='/food/:id' 
						component={Food}
						history={this.props.history}
					/>
					<Route path='/personal-area'
						component={PersonalArea}
						history={this.props.history}
					/>
					<Route render={() => <Redirect to="/" />} />
				</Switch>
				<Footer />
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => (state);

export default connect(
	mapStateToProps,
	{
		loadTop,
	},	
)(App);