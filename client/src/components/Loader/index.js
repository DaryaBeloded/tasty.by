import React from 'react';
import Loader from 'react-loader-spinner';
import './styles.css';

const ComponentLoader = ({ color }) => {
    return (
        <Loader 
            type="ThreeDots" 
            color={ color ? color : "black"}
            height={80} 
            width={80} 
        /> 
    )
}

export default ComponentLoader;