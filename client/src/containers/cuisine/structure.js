import React, { Component } from 'react';
import { loadCuisines } from '../../redux/actions';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { FILTERS } from '../../utils/utils';
import ItemsList from '../../components/StructureComponents/ItemsList';
import './structure.css';

class Structure extends Component {

    componentDidMount = () => {
        this.props.loadCuisines();
    }

    render() {

        const {
            cuisines: {
                data,
                isLoading,
            },
            history,
        } = this.props;

        if (isLoading) return (
            <div className="loader">
                <Loader />
            </div>
        )

        return (
            <main className="wrapper">
                <ItemsList 
                    data={data} 
                    history={history}
                    filter={FILTERS.CUISINE}
                />
            </main>
        );
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
)(Structure);