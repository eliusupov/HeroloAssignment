import React from 'react';
import moment from 'moment';
import { Collapse } from 'antd';
import { PropTypes } from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import classes from './MessagesListSection.module.scss';

const messagesListSection = props => {
	const { messages, title, type, handleDeleteMessageModal } = props;
	const { Panel } = Collapse;
	return (
		<div className={classes.messagesListSection}>
			<h2>{title}</h2>
			<Collapse accordion>
				{messages.map(messageObj => {
					const { _id, createDate, message, subject, toName, fromName } = messageObj;
					const resolvedCreateDate = createDate ? moment(createDate).format('DD.MM.YY HH:mm') : '';
					let header = '';
					const extra = (
						<CloseOutlined
							onClick={event => {
								event.stopPropagation();
								handleDeleteMessageModal({ id: _id, type });
							}}
						/>
					);

					if (type === 'sent') {
						header = `Sent to ${toName}, at ${resolvedCreateDate}`;
					} else if (type === 'received') {
						header = `Received from ${fromName}, at ${resolvedCreateDate}`;
					}
					return (
						<Panel key={_id} header={header} extra={extra}>
							<p className={classes.subject}>{subject}</p>
							<p>{message}</p>
						</Panel>
					);
				})}
			</Collapse>
		</div>
	);
};

messagesListSection.defaultProps = {
	type: '',
	title: '',
	messages: [],
	handleDeleteMessageModal: () => {},
};

messagesListSection.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			toName: PropTypes.string,
			subject: PropTypes.string,
			message: PropTypes.string,
			fromName: PropTypes.string,
			createDate: PropTypes.string,
		}),
	),
	handleDeleteMessageModal: PropTypes.func,
};

export default messagesListSection;
