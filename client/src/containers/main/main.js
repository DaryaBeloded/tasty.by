import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import './main.css';

class Main extends Component {

	state = {
		stopInterval: null,
	}

	handleClick = id => {
		this.props.history.push(`/food/${id}`);
	}

	getSliderItems = data => {
		return (
			data.map((item, index) => {
				let temp_class = "";
				index === 0 ? temp_class = "slide showing" : temp_class = "slide";
				return (
					<li key={index} className={temp_class} style={{ backgroundImage: `url(${item.image})` }}>
						<div className="category">
							<span className="text-of-category">{item.category.title}</span>
						</div>
						<div className="name-of-food">
							<span className="text-of-name-of-food">{item.title}</span>
						</div>
					</li>
				)
			})
		);
	}

	getPopularItems = data => {
		return (
			data.map((item, index) => {
				return (
					<div className="container-top" key={index}>
						<Link to={{ pathname: `/food/${item._id}` }}>
							<img className="top" alt={item.name} src={item.image} onClick={() => this.handleClick(item._id)} />
						</Link>
						<div className="about-top">
							<div className="about-top-top-part">
								<span>{item.title}</span>
							</div>
							<div className="about-top-bottom-part">
								<span>{item.price_per_portion} р.</span>
							</div>
						</div>
					</div>
				)
			})
		);
	}

	runSlider = () => {
		let currentslide = 0;
		let nextSlide = () => {
			document.querySelectorAll('#slides .slide')[currentslide].className = 'slide';
			currentslide = (currentslide + 1) % document.querySelectorAll('#slides .slide').length;
			document.querySelectorAll('#slides .slide')[currentslide].className = 'slide showing';
		}
		let stopInterval = setInterval(nextSlide, 5000);
		this.setState({ stopInterval });
	}

	componentDidMount = () => {
		// this.runSlider();
	}

	componentWillUnmount = () => {
		clearInterval(this.state.stopInterval);
	}

	render() {

		const {
			props: {
				top: {
					data,
					isLoading,
				},
			},
		} = this;

		if (isLoading) return (
			<div className="loader">
				<Loader />
			</div>)

		const slider_items = this.getSliderItems(data);
		const popular_items = this.getPopularItems(data);
		return (
			<main>
				<div className="container-slider">
					<div className="title-on-slider">
						<span>Топ-1 сегодня</span>
					</div>
					<ul id="slides">
						{slider_items}
					</ul>
				</div>
				<div className="container-food">
					{popular_items}
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		top: state.top,
	}
}

export default connect(
	mapStateToProps,
)(Main);