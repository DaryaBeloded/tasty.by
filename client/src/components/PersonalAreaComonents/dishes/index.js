import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRating } from '../../../redux/actions';
import emptyStar from './images/emptyStar.svg';
import yellowStar from './images/yellowStar.svg';
import './styles.css';

class Dishes extends Component {
  state = {
    stars: [
      emptyStar,
      emptyStar,
      emptyStar,
      emptyStar,
      emptyStar,
    ],
  };

  setRating = ({ target }) => {
    let rating = target.getAttribute('id');
    const dishId = target.parentNode.getAttribute('data-index');

    let newRating = this.state.stars.map((el, index) => {
      if (index <= rating) {
        return yellowStar;
      }
      return emptyStar;
    })

    this.setState({
      stars: newRating,
    });

    this.props.sendRating(dishId, ++rating, target);
  }

  hoverRating = (e) => {
    const currStar = e.target.getAttribute('id');
    const stars = Array.from(e.target.parentNode.children);
    const hoverStars = stars.filter(el => el.getAttribute('id') <= currStar);
    hoverStars.forEach(el => el.setAttribute('src', yellowStar));
  }

  unhoverRating = (e) => {
    const currStar = e.target.getAttribute('id');
    const stars = Array.from(e.target.parentNode.children);
    const hoverStars = stars.filter(el => el.getAttribute('id') <= currStar);
    hoverStars.forEach(el => el.setAttribute('src', this.state.stars[el.getAttribute('id')]));
  }

  getRating = () => this.state.stars.filter(el => el === yellowStar).length;

  render() {
    const {
      props: {
        dish: {
          dish,
          cafe_id,
          number_of_servings,
        }
      }
    } = this;

    return (
      <div className="row-dish">
        <div className="description">
          <span className="dish-title">{dish.title}</span>
          <span className="cafe-title">{cafe_id ? cafe_id.title : null}</span>
          <span className="dish-count">{number_of_servings} шт.</span>
        </div>
        <div className="stars" data-index={dish._id}>
          <img src={this.state.stars[0]} alt="Star" id='0' onClick={this.setRating} 
          onMouseOver={this.hoverRating} onMouseOut={this.unhoverRating} 
          />
          <img src={this.state.stars[1]} alt="Star" id='1' onClick={this.setRating} 
          onMouseOver={this.hoverRating} onMouseOut={this.unhoverRating} 
          />
          <img src={this.state.stars[2]} alt="Star" id='2' onClick={this.setRating} 
          onMouseOver={this.hoverRating} onMouseOut={this.unhoverRating} 
          />
          <img src={this.state.stars[3]} alt="Star" id='3' onClick={this.setRating} 
          onMouseOver={this.hoverRating} onMouseOut={this.unhoverRating} 
          />
          <img src={this.state.stars[4]} alt="Star" id='4' onClick={this.setRating} 
          onMouseOver={this.hoverRating} onMouseOut={this.unhoverRating} 
          />
        </div>
      </div>
    )
  }
};

export default connect(
  (state) => ({}),
  {
    sendRating,
  }
)(Dishes);