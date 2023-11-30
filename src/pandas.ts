import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const pandas: CustomThemeConfig = {
	name: 'pandas',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '0px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #6cf4db
		'--color-primary-50': '233 253 250', // #e9fdfa
		'--color-primary-100': '226 253 248', // #e2fdf8
		'--color-primary-200': '218 252 246', // #dafcf6
		'--color-primary-300': '196 251 241', // #c4fbf1
		'--color-primary-400': '152 247 230', // #98f7e6
		'--color-primary-500': '108 244 219', // #6cf4db
		'--color-primary-600': '97 220 197', // #61dcc5
		'--color-primary-700': '81 183 164', // #51b7a4
		'--color-primary-800': '65 146 131', // #419283
		'--color-primary-900': '53 120 107', // #35786b
		// secondary | #9476e5
		'--color-secondary-50': '239 234 251', // #efeafb
		'--color-secondary-100': '234 228 250', // #eae4fa
		'--color-secondary-200': '228 221 249', // #e4ddf9
		'--color-secondary-300': '212 200 245', // #d4c8f5
		'--color-secondary-400': '180 159 237', // #b49fed
		'--color-secondary-500': '148 118 229', // #9476e5
		'--color-secondary-600': '133 106 206', // #856ace
		'--color-secondary-700': '111 89 172', // #6f59ac
		'--color-secondary-800': '89 71 137', // #594789
		'--color-secondary-900': '73 58 112', // #493a70
		// tertiary | #61cdff
		'--color-tertiary-50': '231 248 255', // #e7f8ff
		'--color-tertiary-100': '223 245 255', // #dff5ff
		'--color-tertiary-200': '216 243 255', // #d8f3ff
		'--color-tertiary-300': '192 235 255', // #c0ebff
		'--color-tertiary-400': '144 220 255', // #90dcff
		'--color-tertiary-500': '97 205 255', // #61cdff
		'--color-tertiary-600': '87 185 230', // #57b9e6
		'--color-tertiary-700': '73 154 191', // #499abf
		'--color-tertiary-800': '58 123 153', // #3a7b99
		'--color-tertiary-900': '48 100 125', // #30647d
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #243347
		'--color-surface-50': '222 224 227', // #dee0e3
		'--color-surface-100': '211 214 218', // #d3d6da
		'--color-surface-200': '200 204 209', // #c8ccd1
		'--color-surface-300': '167 173 181', // #a7adb5
		'--color-surface-400': '102 112 126', // #66707e
		'--color-surface-500': '36 51 71', // #243347
		'--color-surface-600': '32 46 64', // #202e40
		'--color-surface-700': '27 38 53', // #1b2635
		'--color-surface-800': '22 31 43', // #161f2b
		'--color-surface-900': '18 25 35' // #121923
	}
};
