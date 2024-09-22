import { ObjectDeepValidator } from '../decorators';
import { Client } from '../root';

/**
 * The base class for each class of the ./base folder. Each class from (this) the src/base folder
 * is an extend of this class.
 */
export class BaseClient {
	@ObjectDeepValidator.IsInstanceOf(Client)
	public client: Client;

	/**
	 * Initialize the base class with the main client instance.
	 * @param client The client instance.
	 */
	constructor(client: Client) {
		this.client = client;
	}
}
