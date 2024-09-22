import * as chalk from 'chalk';
import { LoggerMode, loggerModes } from '../root';

/**
 * The Logger class. Contains multiple functions to log data.
 */
export class Logger {
	/**
	 * Split a str to make it fit into a given size.
	 * @param str The str to crop.
	 * @param max The max length limit.
	 * @returns The cropped (or not) string.
	 */
	private crop(str: string, max: number | 'flex'): string {
		if (max === 'flex') return str;
		return str.length > max
			? str.slice(0, max - 3) + '...'
			: str + '.'.repeat(max - str.length);
	}

	/**
	 * Returns the prefix for the logging.
	 * @param mode The 'label' that describes the assets pack.
	 * @param str The string to split to fit a given size.
	 * @returns The prefix (str).
	 */
	public prefix(mode: string, str: string = process.env.PROJECT_NAME.toLowerCase()): string {
		return `(${new Logger().crop(mode, 'flex')}) ${new Logger().crop(str, 'flex')}`;
	}

	/**
	 * Logs something in the console using the chosen assets.
	 * @param mode The mode (assets pack).
	 * @param args The data to print.
	 * @returns Nothing.
	 */
	public log(mode: LoggerMode | string, ...args: unknown[]): void {
		const color: string = loggerModes.includes(mode as LoggerMode)
			? {
					error: 'red',
					success: 'green',
					warning: 'yellow',
					info: 'blue',
					debug: 'magenta',
					test: 'cyan',
					clean: 'gray',
			  }[mode]
			: 'white';
		const assets: chalk.Chalk = chalk[color];

		if (process.env.DEV_MODE === 'false')
			console.log(
				assets(`${this.prefix(mode, process.env.PROJECT_NAME.toLowerCase())} →`),
				assets(...args),
			);
		if (process.env.DEV_MODE === 'true') {
			console.log(assets(`${this.prefix(mode, process.env.PROJECT_NAME.toLowerCase())} ↵`));
			console.log(...args);
		}
	}

	/**
	 * Logs something in the console using the clean assets.
	 * @param args The data to print.
	 * @returns Nothing.
	 */
	public clean(...args: unknown[]): void {
		this.log('clean', args);
	}
}
