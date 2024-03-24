export const validateRequiredField = (value, label = 'Field') => {
	if (!value) {
		return `* ${label} is required`;
	}
};
