import React from 'react';
import Items from '../Items';
import { connect } from 'react-redux';
import { setFilter } from '../../../redux/actions';

const ItemList = ({ data, history, filter, setFilter }) => {

    const handleClick = name => {
        setFilter(name);
    }

    return data.map(item => {
        return (
            <div className={item.name} key={item._id} onClick={() => handleClick(item.name)}>
                <div className="category-name">
                    <span>{item.name}</span>
                </div>
                <div className="category-items">
                    <Items 
                        item={item} 
                        history={history}
                        filter={filter}
                    />
                </div>
            </div>
        )
    })
}

const mapStateToProps = (state) => {    
    return {
        globalFilter: state.filter,
    }
}

export default connect(
    mapStateToProps,
    {
        setFilter,
    }
)(ItemList);