import { has } from 'lodash';

export const bindElement = (fieldSelect, contextDetail) => {
	if (!has(contextDetail, fieldSelect)) {
		return null;
	}

	return contextDetail[fieldSelect];
};
