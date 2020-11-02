import axios from 'axios';

import * as actionTypes from './actionTypes';
import { openSuccessNotification, openErrorNotification } from '../../Utils/helper';

const setMessages = messages => ({ type: actionTypes.SET_MESSAGES, messages });
const setDeletedMessage = (id, messageType) => ({ type: actionTypes.SET_DELETED_MESSAGE, id, messageType });
const setMessageToDelete = messageToDelete => ({ messageToDelete, type: actionTypes.SET_MESSAGE_TO_DELETE });

export const sendMessage = message => async () => {
	try {
		await axios.put('/message', { ...message });
		openSuccessNotification('Success!', 'Message was sent');
	} catch (err) {
		openErrorNotification('Error', 'Error in sending a message');
	}
};

export const getMessages = id => async dispatch => {
	try {
		const response = await axios.get(`/message/${id}`);
		const { data: messages } = response;
		dispatch(setMessages(messages));
	} catch (err) {
		openErrorNotification('Error', 'Something went wrong');
	}
};

export const deleteMessage = (id, messageType) => async dispatch => {
	try {
		const response = await axios.delete(`/message/${id}`);
		const { data } = response;
		const { _id } = data;
		dispatch(setDeletedMessage(_id, messageType));
		openSuccessNotification('Success!', 'Message was deleted');
	} catch (err) {
		openErrorNotification('Error', 'Something went wrong');
	}
};

export const handleDeleteMessageModal = messageToDelete => dispatch => {
	dispatch(setMessageToDelete(messageToDelete));
};
