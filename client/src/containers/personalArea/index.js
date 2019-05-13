import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PersonalSiderMenu from '../../components/PersonalAreaComonents/personalSiderMenu';
import PersonalData from '../../components/PersonalAreaComonents/personalData';
import PurchaseHistory from '../../components/PersonalAreaComonents/purchaseHistory';
import Favorites from '../../components/PersonalAreaComonents/favorites';
import './styles.css';

const PersonalArea = ({ history }) => {
    return (
        <div className="personalarea">
            <PersonalSiderMenu history={history}/>
            <div className="personalarea-content">
                <Switch>
                    <Route exact path='/personal-area/data' component={PersonalData} />
					<Route path='/personal-area/history' component={PurchaseHistory} />
                    <Route path='/personal-area/favorites' component={Favorites} />
                </Switch>
            </div>
        </div>
    )
}

export default PersonalArea;