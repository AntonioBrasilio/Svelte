import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export const tippyAction = (node, options) => {
	const { content } = options;

	const instance = tippy(node, {
		content,
		...options
	});

	return {
		update(newOptions) {
			Object.assign(options, newOptions);
			// @ts-ignore
			instance.setProps(options);
		},
		destroy() {
			// @ts-ignore
			instance.destroy();
		}
	};
};
