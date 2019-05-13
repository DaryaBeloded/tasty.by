import React, { Component } from 'react';
import { loadCafes, loadCafe } from '../../redux/actions';
import { FILTERS } from '../../utils/utils';
import './cafes.css'
import { connect } from 'react-redux';
import Loader from '../../components/Loader';

class Cafes extends Component {

    componentDidMount = () => {
        this.props.loadCafes();
    }

    toCafe = cafe => {
        this.props.loadCafe(cafe._id, FILTERS.CAFE, null);
        this.props.history.push(`cafe/${ cafe._id }`);
    }

    getItems = (data) => {
        return data.map((item, index) =>{
            return (
                <div className = "element-of-list" key = { index }>
                    <div className="img-container">
                        <img    
                            className="image" 
                            src={item.image} 
                            alt={item.alt} 
                            onClick={() => this.toCafe(item)}
                        />
                    </div>
                    <div className = "info">
                        <div className = "info-top-part">
                            <div className = "first-cell">
                                <span className = "first-cell-content">{ item.title }</span>
                            </div >
                            <div className = "second-cell">
                                <span className = "second-cell-content">{ item.delivery_time }</span>
                            </div>
                        </div>
                        <div className = "info-bottom-part">
                            <div className = "third-cell">
                                <span className = "third-cell-content">{ item.delivery }</span>
                            </div>
                            <div className = "fourth-cell">
                                <span className = "fourth-cell-content">{ item.delivery_price }</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render () {

        const {
            cafes: {
                data,
                isLoading,
            }
        } = this.props;

        if (isLoading) return ( 
            <div className="loader">
                <Loader />
            </div>)

        const items = this.getItems(data);

        return (
            <div className="content-list">
                <div className = "container">
                    <div className = "title">
                        <span className = "title-content">Кафе Минска</span>
                    </div>
                    <div className = "list-of-current-title">
                        { items }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cafes: state.cafes,
    }
}

export default connect(
    mapStateToProps,
    {
        loadCafes,
        loadCafe,
    }
)(Cafes)