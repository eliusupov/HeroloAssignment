import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from './store/actions/actions';

import Message from './Containers/Message/Message';
import SystemEntry from './Containers/SystemEntry/SystemEntry';
import ManageMessages from './Containers/ManageMessages/ManageMessages';

const routes = props => {
	const { history } = props;
	const dispatch = useDispatch();
	const { setTokenFromLocalstorage } = actions;
	const token = useSelector(state => state.userReducer.token);

	useEffect(() => {
		if (!token && localStorage.token) {
			dispatch(setTokenFromLocalstorage(localStorage.token, history));
		}
	}, [token]);

	return (
		<>
			<Route exact path="/" component={SystemEntry} />
			<Route exact path="/login" component={SystemEntry} />
			<Route exact path="/register" component={SystemEntry} />
			{token && (
				<>
					<Route exact path="/message" component={Message} />
					<Route exact path="/view" component={ManageMessages} />
				</>
			)}
		</>
	);
};

routes.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func,
	}).isRequired,
};

export default withRouter(routes);
