import * as actionTypes from '../actions/actionTypes';

const initialState = {
	messages: {
		sent: [],
		received: [],
	},
	messageToDelete: null,
};

const setMessages = (state, action) => {
	return {
		...state,
		messages: action.messages,
	};
};

const setDeletedMessage = (state, action) => {
	return {
		...state,
		messages: {
			...state.messages,
			[action.messageType]: state.messages[action.messageType].filter(message => message._id !== action.id),
		},
		messageToDelete: null,
	};
};

const setMessageToDelete = (state, action) => {
	return {
		...state,
		messageToDelete: action.messageToDelete,
	};
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_MESSAGES:
			return setMessages(state, action);
		case actionTypes.SET_DELETED_MESSAGE:
			return setDeletedMessage(state, action);
		case actionTypes.SET_MESSAGE_TO_DELETE:
			return setMessageToDelete(state, action);
		default:
			return state;
	}
};

export default userReducer;
