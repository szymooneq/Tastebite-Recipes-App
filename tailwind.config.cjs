/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {}
	},
	variants: {
		extend: {
			lineClamp: ['hover']
		}
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')]
}
