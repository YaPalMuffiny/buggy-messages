const handler = require('../../../../main/discord/core/handler/handler.js');

/* eslint-disable no-unused-vars, no-constant-condition */
if (null) {
	const heartType = require('../../../../types/heart.js');
	const handlerType = require('../../../../types/discord/core/handler/handler.js');
}
/* eslint-enable no-unused-vars, no-constant-condition  */


/**
 * A class representing the Buggy Messages handler.
 * @class
 * @extends handlerType
 */
module.exports = class buggymsgsHandler extends handler {
	/**
     * Creates an instance of the handler.
     * @param {heartType} heart - The heart of the bot.
     */
	constructor(heart) {
		super(heart, 'buggymsgs');
		heart.core.discord.core.cache.manager.register(new heart.core.discord.core.cache.interface(heart, 'buggymsgsCache'));
	}

	getCache() {
		return this.heart.core.discord.core.cache.manager.get('buggymsgsCache');
	}
};