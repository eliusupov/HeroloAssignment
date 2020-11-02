import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/actions';

import classes from './MainNavBar.module.scss';

const mainNavBar = props => {
	const { history } = props;
	const dispatch = useDispatch();
	const { userLogout } = actions;
	return (
		<ul className={classes.mainNavBar}>
			<li>
				<Link to="/view">
					<span>Sent\Received</span>
				</Link>
			</li>
			<li>
				<Link to="/message">
					<span>Send A Message</span>
				</Link>
			</li>
			<li>
				<Button type="primary" onClick={() => dispatch(userLogout(history))}>
					<span>Logout</span>
				</Button>
			</li>
		</ul>
	);
};

mainNavBar.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}),
	}).isRequired,
};

export default mainNavBar;
