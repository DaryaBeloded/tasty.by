import React from 'react';

const TopList = () => {

    const closeTop = () => {
		document.getElementsByClassName('container-main-top')[0].classList.remove("on");
	}

    return (
        <div className="container-main-top">
            <div className="back" onClick={closeTop}>
                <span>Назад</span>
            </div>
            <div className="container-top">
                <div className="content-top">
                    <span>Топ-5 кафе-ресторанов</span>
                    <ul>
                        <li>value 1</li>
                        <li>value 2</li>
                        <li>value 3</li>
                        <li>value 4</li>
                        <li>value 5</li>
                        <li className='cafe'>Весь список</li>
                    </ul>
                </div>
            </div>
            <div className="container-top">
                <div className="content-top">
                    <span>Топ-5 кухонь</span>
                    <ul>
                        <li>value 1</li>
                        <li>value 2</li>
                        <li>value 3</li>
                        <li>value 4</li>
                        <li>value 5</li>
                        <li className='cuisine'>Весь список</li>
                    </ul>
                </div>
            </div>
            <div className="container-top">
                <div className="content-top">
                    <span>Топ-5 блюд</span>
                    <ul>
                        <li>value 1</li>
                        <li>value 2</li>
                        <li>value 3</li>
                        <li>value 4</li>
                        <li>value 5</li>
                        <li className='food'>Весь список</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default TopList;