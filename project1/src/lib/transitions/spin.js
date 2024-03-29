import { cubicInOut } from 'svelte/easing';

export const spin = (node, { delay = 0, duration = 400, easing = cubicInOut, spin = 1 }) => {
	const originalOpacity = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		easing,
		css(t, u) {
			return `
                opacity: ${t * originalOpacity};
                transform:  scale(${t}) rotate(${t * spin * 360}deg);
            `;
		}
	};
};
