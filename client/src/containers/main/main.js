import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import How_1 from '../../img/how_1.svg';
import How_2 from '../../img/how_2.svg';
import How_3 from '../../img/how_3.svg';
import How_4 from '../../img/how_4.svg';
import Cook_1 from '../../img/cook_1.jpg';
import Cook_2 from '../../img/cook_2.jpg';
import Cook_3 from '../../img/cook_3.jpg';
import Cook_4 from '../../img/cook_4.jpg';
import './main.css';

class Main extends Component {

	state = {
		stopInterval: null,
		instruction: [
			{
				image: How_1,
				desc: '1. Выбирайте блюда на ваш вкус',
			},
			{
				image: How_3,
				desc: '2. Оформляйте заказ на удобное для Вас время',
			},
			{
				image: How_2,
				desc: '3. Получайте заказанные блюда',
			},
			{
				image: How_4,
				desc: '4. Настройте график доставки, с учетом вашего графика, выходных и отпуска',
			},
		],
		cooks: [
			{
				image: Cook_1,
				name: 'Пьер Дюкан',
			},
			{
				image: Cook_2,
				name: 'Василий Емельяненко',
			},
			{
				image: Cook_3,
				name: 'Лодыгина Юлия',
			},
			{
				image: Cook_4,
				name: 'Тазутдинов Равиль',
			},
		],
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

	getHowThisWorking = (data) => {
		return (
			data.map((item, index) => {
				return (
					<div className="container-top" key={index}>
						<div>
							<img className="top" alt={item.name} src={item.image} />
						</div>
						<div className="about-top">
							<div className="about-top-top-part">
								<span>{item.desc}</span>
							</div>
						</div>
					</div>
				)
			})
		);
	}

	getCooks = (data) => {
		return (
			data.map((item, index) => {
				return (
					<div className="container-top" key={index}>
						<div>
							<img className="top" alt={item.name} src={item.image} />
						</div>
						<div className="about-top">
							<div className="about-top-top-part">
								<a href="mailto:info@tasty.by" target="_blank" rel="noopener noreferrer">
									<span>{item.name}</span>
								</a>
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
		this.runSlider();
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
			getSliderItems,
			getHowThisWorking,
			getCooks,
			state: {
				instruction,
				cooks,
			},
		} = this;

		if (isLoading) return (
			<div className="loader">
				<Loader />
			</div>)

		const slider_items = getSliderItems(data);
		const instr_items = getHowThisWorking(instruction);
		const cooks_items = getCooks(cooks);

		return (
			<main>
				<div className="container-slider">
					<ul id="slides">
						{slider_items}
					</ul>
				</div>
				<div className="container-food">
					<div className="title">
						<span>Как это работает?</span>
					</div>
					<div className="foods">
						{instr_items}
					</div>
				</div>
				<div className="container-food">
					<div className="title">
						<span>Наши повара</span>
					</div>
					<div className="foods">
						{cooks_items}
					</div>
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