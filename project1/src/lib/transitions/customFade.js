import { cubicInOut } from 'svelte/easing';

export const customFade = (node, { delay = 0, duration = 400, easing = cubicInOut }) => {
	const originalOpacity = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		tick: (t) => {
			node.style.opacity = originalOpacity * t;
		}
	};
};
