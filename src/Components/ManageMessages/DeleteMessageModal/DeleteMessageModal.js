import React from 'react';
import { Modal } from 'antd';
import { PropTypes } from 'prop-types';

const deleteMesageModal = props => {
	const { text, visible, onOk, onCancel } = props;
	return (
		<Modal visible={visible} onOk={onOk} onCancel={onCancel}>
			<p>{text}</p>
		</Modal>
	);
};

deleteMesageModal.defaultProps = {
	visible: false,
};

deleteMesageModal.propTypes = {
	visible: PropTypes.bool,
	onOk: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default deleteMesageModal;
