import { notification } from 'antd';

export const openSuccessNotification = (message, description) => {
	notification.success({
		message,
		description,
		duration: 2,
	});
};

export const openErrorNotification = (message, description) => {
    notification.error({
        message,
        description,
        duration: 2,
    });
};
