import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFavorites, toggleFavorites } from '../../../redux/actions';
import FavoriteItem from '../favoriteItem';
import Loader from '../../Loader';

class Favorites extends Component {

    componentDidMount = () => {
        this.props.loadFavorites();
    }

    toggleFavorites = ({ target }) => {
        const food = JSON.parse(target.getAttribute('data-index'));
        const {
            toggleFavorites,
            favorites: {
                data,
            },
        } = this.props;
        console.log(data);
        toggleFavorites(food, data);
    }

    render() {
        const { 
            favorites: {
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
            <div className="favorites-content">
                {data.map(item => 
                    <FavoriteItem 
                        key={item._id}
                        item={item}
                        toggleFavorites={this.toggleFavorites}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
    }
}

export default connect(
    mapStateToProps,
    {
        loadFavorites,
        toggleFavorites,
    }
)(Favorites);