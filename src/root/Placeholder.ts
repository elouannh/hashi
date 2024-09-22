import { StringValidator } from '../decorators';

/**
 * The placeholder class when data is missing.
 */
export class Placeholder {
	/**
	 * The value.
	 */
	@StringValidator.NotEmpty
	public readonly value: string = 'placeholder';
}
