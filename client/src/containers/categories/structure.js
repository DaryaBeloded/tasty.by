import React, { Component } from 'react';
import { loadCategories } from '../../redux/actions';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { FILTERS } from '../../utils/utils';
import ItemsList from '../../components/StructureComponents/ItemsList';
import '../cuisine/structure.css';

class Structure extends Component {

    componentDidMount = () => {
        this.props.loadCategories();
    }

    render() {

        const {
            categories: {
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
                    filter={FILTERS.CATEGORY} 
                />
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    }
}

export default connect(
    mapStateToProps,
    {
        loadCategories,
    }
)(Structure)