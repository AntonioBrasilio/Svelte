export const longpress = (node, options) => {
	let timer;

	const handleMouseDown = () => {
		const { duration = 2000 } = options;

		timer = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, duration);
	};

	const handleMouseUp = () => {
		clearTimeout(timer);
	};

	node.addEventListener('mousedown', handleMouseDown);
	node.addEventListener('mouseup', handleMouseUp);

	return {
		update(newOptions) {
			options = newOptions;
		},
		destroy() {
			clearTimeout(timer);
			node.removeEventListener('mousedown', handleMouseDown);
			node.removeEventListener('mouseup', handleMouseUp);
		}
	};
};
