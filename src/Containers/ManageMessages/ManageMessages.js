import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/actions';
import MainNavBar from '../../Components/MainComponents/MainNavBar/MainNavBar';
import DeleteMessageModal from '../../Components/ManageMessages/DeleteMessageModal/DeleteMessageModal';
import MessagesListSection from '../../Components/ManageMessages/MessagesListSection/MessagesListSection';

import classes from './ManageMessages.module.scss';

const manageMessages = props => {
	const { history } = props;
	const dispatch = useDispatch();
	const token = useSelector(state => state.userReducer.token);
	const userId = useSelector(state => state.userReducer.userId);
	const messages = useSelector(state => state.messageReducer.messages);
	const messageToDelete = useSelector(state => state.messageReducer.messageToDelete);

	const { sent, received } = messages;

	const handleGetMessages = userId => {
		const { getMessages } = actions;
		dispatch(getMessages(userId));
	};

	const handleDeleteMessageModal = messageToDelete => {
		const { handleDeleteMessageModal } = actions;
		dispatch(handleDeleteMessageModal(messageToDelete));
	};

	const handleDeleteMessage = messageToDelete => {
		const { deleteMessage } = actions;
		dispatch(deleteMessage(messageToDelete.id, messageToDelete.type));
	};

	useEffect(() => {
		if (token && userId) handleGetMessages(userId);
	}, [token, userId]);

	return (
		<div className={classes.manageMessages}>
			<DeleteMessageModal
				text="Are you sure you want to delete this message?"
				visible={!!messageToDelete}
				onOk={() => handleDeleteMessage(messageToDelete)}
				onCancel={() => handleDeleteMessageModal(null)}
			/>
			<MainNavBar history={history} />
			<div className={classes.inner}>
				<MessagesListSection
					type="received"
					messages={received}
					title="Received Messages"
					handleDeleteMessageModal={messageToDelete => handleDeleteMessageModal(messageToDelete)}
				/>
				<div className={classes.spacer} />
				<MessagesListSection
					type="sent"
					messages={sent}
					title="Sent Messages"
					handleDeleteMessageModal={messageToDelete => handleDeleteMessageModal(messageToDelete)}
				/>
			</div>
		</div>
	);
};

manageMessages.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}),
	}).isRequired,
};

export default manageMessages;
