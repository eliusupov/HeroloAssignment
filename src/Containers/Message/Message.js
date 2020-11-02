import React, { useEffect } from 'react';
import { Button, Form, Select, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as actions from '../../store/actions/actions';
import MainNavBar from '../../Components/MainComponents/MainNavBar/MainNavBar';

import classes from './Message.module.scss';

const message = props => {
	const { history } = props;
	const { Option } = Select;
	const { TextArea } = Input;
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const token = useSelector(state => state.userReducer.token);
	const userId = useSelector(state => state.userReducer.userId);
	const recipients = useSelector(state => state.userReducer.recipients);

	const handleSendMessages = async values => {
		const { sendMessage } = actions;
		await dispatch(sendMessage({ ...values, fromId: userId }));
	};

	const handleUserGetRecipients = () => {
		const { userGetRecipients } = actions;
		dispatch(userGetRecipients());
	};

	const onSubmitMessage = async values => {
		await handleSendMessages({ ...values, fromId: userId });
		form.resetFields();
	};

	useEffect(() => {
		if (token) handleUserGetRecipients();
	}, [token]);

	return (
		<div className={classes.message}>
			<MainNavBar history={history} />
			<Form
				form={form}
				name="message"
				className={classes.messageForm}
				initialValues={{ remember: true }}
				onFinish={onSubmitMessage}
			>
				<h2>Send A Message</h2>
				<Form.Item name="toId" rules={[{ required: true, message: 'Please choose a recipient' }]}>
					<Select placeholder="Message to">
						{recipients.map(recipient => {
							const { _id, email } = recipient;
							return (
								<Option key={_id} value={_id}>
									<span>{email}</span>
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item name="subject" rules={[{ required: true, message: 'Please type in a subject' }]}>
					<Input placeholder="Subject" />
				</Form.Item>
				<Form.Item
					name="message"
					className={classes.messageInput}
					rules={[{ required: true, message: 'Please type in a message' }]}
				>
					<TextArea placeholder="Message Text" autoSize={{ minRows: 10, maxRows: 20 }} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						<span>Send</span>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

message.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func,
	}).isRequired,
};

export default message;
