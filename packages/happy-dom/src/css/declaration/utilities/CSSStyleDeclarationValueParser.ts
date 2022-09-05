const COLOR_REGEXP =
	/^#([0-9a-fA-F]{3,4}){1,2}$|^rgb\(([^)]*)\)$|^rgba\(([^)]*)\)$|^hsla?\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*(,\s*(-?\d+|-?\d*.\d+)\s*)?\)/;

const LENGTH_REGEXP = /^(0|[-+]?[0-9]*\.?[0-9]+(in|cm|em|mm|pt|pc|px|ex|rem|vh|vw|ch))$/;
const PERCENTAGE_REGEXP = /^[-+]?[0-9]*\.?[0-9]+%$/;
const DEGREE_REGEXP = /^[0-9]+deg$/;
const URL_REGEXP = /^url\(\s*([^)]*)\s*\)$/;
const INTEGER_REGEXP = /^[0-9]+$/;
const FLOAT_REGEXP = /^[0-9.]+$/;
const GRADIENT_REGEXP =
	/^(repeating-linear|linear|radial|repeating-radial|conic|repeating-conic)-gradient\([^)]+\)$/;
const GLOBALS = ['inherit', 'initial', 'unset', 'revert'];
const COLORS = [
	'currentcolor',
	'transparent',
	'silver',
	'gray',
	'white',
	'maroon',
	'red',
	'purple',
	'fuchsia',
	'green',
	'lime',
	'olive',
	'yellow',
	'navy',
	'blue',
	'teal',
	'aqua',
	'antiquewhite',
	'aquamarine',
	'azure',
	'beige',
	'bisque',
	'blanchedalmond',
	'blueviolet',
	'brown',
	'burlywood',
	'cadetblue',
	'chartreuse',
	'chocolate',
	'coral',
	'cornflowerblue',
	'cornsilk',
	'crimson',
	'darkblue',
	'darkcyan',
	'darkgoldenrod',
	'darkgray',
	'darkgreen',
	'darkgrey',
	'darkkhaki',
	'darkmagenta',
	'darkolivegreen',
	'darkorange',
	'darkorchid',
	'darkred',
	'darksalmon',
	'darkseagreen',
	'darkslateblue',
	'darkslategray',
	'darkslategrey',
	'darkturquoise',
	'darkviolet',
	'deeppink',
	'deepskyblue',
	'dimgray',
	'dimgrey',
	'dodgerblue',
	'firebrick',
	'floralwhite',
	'forestgreen',
	'gainsboro',
	'ghostwhite',
	'gold',
	'goldenrod',
	'greenyellow',
	'grey',
	'honeydew',
	'hotpink',
	'indianred',
	'indigo',
	'ivory',
	'khaki',
	'lavender',
	'lavenderblush',
	'lawngreen',
	'lemonchiffon',
	'lightblue',
	'lightcoral',
	'lightcyan',
	'lightgoldenrodyellow',
	'lightgray',
	'lightgreen',
	'lightgrey',
	'lightpink',
	'lightsalmon',
	'lightseagreen',
	'lightskyblue',
	'lightslategray',
	'lightslategrey',
	'lightsteelblue',
	'lightyellow',
	'limegreen',
	'linen',
	'mediumaquamarine',
	'mediumblue',
	'mediumorchid',
	'mediumpurple',
	'mediumseagreen',
	'mediumslateblue',
	'mediumspringgreen',
	'mediumturquoise',
	'mediumvioletred',
	'midnightblue',
	'mintcream',
	'mistyrose',
	'moccasin',
	'navajowhite',
	'oldlace',
	'olivedrab',
	'orangered',
	'orchid',
	'palegoldenrod',
	'palegreen',
	'paleturquoise',
	'palevioletred',
	'papayawhip',
	'peachpuff',
	'peru',
	'pink',
	'plum',
	'powderblue',
	'rosybrown',
	'royalblue',
	'saddlebrown',
	'salmon',
	'sandybrown',
	'seagreen',
	'seashell',
	'sienna',
	'skyblue',
	'slateblue',
	'slategray',
	'slategrey',
	'snow',
	'springgreen',
	'steelblue',
	'tan',
	'thistle',
	'tomato',
	'turquoise',
	'violet',
	'wheat',
	'whitesmoke',
	'yellowgreen'
];

/**
 * Style declaration value parser.
 */
export default class CSSStyleDeclarationValueParser {
	/**
	 * Returns length.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getLength(value: string): string {
		if (value === '0') {
			return '0px';
		}
		if (LENGTH_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns percentance.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getPercentage(value: string): string {
		if (value === '0') {
			return '0%';
		}
		if (PERCENTAGE_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns degree.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getDegree(value: string): string {
		if (value === '0') {
			return '0deg';
		}
		if (DEGREE_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns measurement.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getMeasurement(value: string): string {
		return this.getLength(value) || this.getPercentage(value);
	}

	/**
	 * Returns measurement or auto.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getMeasurementOrAuto(value: string): string {
		const lowerValue = value.toLowerCase();
		if (lowerValue === 'auto') {
			return lowerValue;
		}
		return this.getMeasurement(value);
	}

	/**
	 * Returns integer.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getInteger(value: string): string {
		if (INTEGER_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns float.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getFloat(value: string): string {
		if (FLOAT_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns gradient.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getGradient(value: string): string {
		if (GRADIENT_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns color.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getColor(value: string): string {
		const lowerValue = value.toLowerCase();
		if (COLORS.includes(lowerValue)) {
			return lowerValue;
		}
		if (COLOR_REGEXP.test(value)) {
			return value;
		}
		return null;
	}

	/**
	 * Returns URL.
	 *
	 * Based on:
	 * https://github.com/jsdom/cssstyle/blob/master/lib/parsers.js#L222
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getURL(value: string): string {
		if (!value) {
			return null;
		}

		const lowerValue = value.toLowerCase();

		if (lowerValue === 'none' || lowerValue === 'inherit') {
			return lowerValue;
		}

		const result = URL_REGEXP.exec(value);

		if (!result) {
			return null;
		}

		let url = result[1];

		if ((url[0] === '"' || url[0] === "'") && url[0] !== url[url.length - 1]) {
			return null;
		}

		if (url[0] === '"' || url[0] === "'") {
			url = url.substring(1, url.length - 1);
		}

		for (let i = 0; i < url.length; i++) {
			switch (url[i]) {
				case '(':
				case ')':
				case ' ':
				case '\t':
				case '\n':
				case "'":
				case '"':
					return null;
				case '\\':
					i++;
					break;
			}
		}

		return value;
	}

	/**
	 * Returns global.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getGlobal(value: string): string {
		const lowerValue = value.toLowerCase();
		return GLOBALS.includes(lowerValue) ? lowerValue : null;
	}

	/**
	 * Returns global.
	 *
	 * @param value Value.
	 * @returns Parsed value.
	 */
	public static getNonGlobalOrInitial(value: string): string {
		const global = this.getGlobal(value);
		return !global || global === 'initial' ? value : null;
	}
}
