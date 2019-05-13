import React from 'react';
import DesktopHeader from '../../components/HeaderComponents/desktopHeader';
import MobileHeader from '../../components/HeaderComponents/mobileHeader';
import TopList from '../../components/HeaderComponents/topList';
import Authorization from '../../components/HeaderComponents/authorization';
import { connect } from 'react-redux';
import './header.css';

const Header = ({ auth }) => {
	return (
		<nav className="header">
			<DesktopHeader auth={auth} />
			<MobileHeader auth={auth} />
			<TopList />
			{!auth ? <Authorization /> : null}
		</nav>
	);
}

const mapStateTopProps = (state) => {
	return {
		auth: state.login.data.auth,
	}
};

export default connect(
	mapStateTopProps,
)(Header);