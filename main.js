const plugin = require('../../main/discord/core/plugins/plugin.js');
const buggymsgsHandler = require('./src/handler/buggymsgs.js');

/* eslint-disable no-unused-vars, no-constant-condition */
if (null) {
	const heartType = require('../../types/heart.js');
	const pluginType = require('../../types/discord/core/plugins/plugin.js');
}
/* eslint-enable no-unused-vars, no-constant-condition  */

/**
 * A class representing the test plugin.
 * @class
 * @extends pluginType
 */
module.exports = class test extends plugin {
	/**
     * Creates an instance of this plugin.
     * @param {heartType} heart - The heart of the bot.
     */
	constructor(heart) {
		super(heart, { name: 'buggy-messages', author: 'Zero Development', version: '1.0.0', priority: 0, dependencies: ['core'], softDependencies: [], nodeDependencies: [], channels: [] });
	}

	async preLoad() {
		this.heart.core.console.log(this.heart.core.console.type.startup, 'The plugin is pre-loading now...');
		const buggymsgsConfig = new this.heart.core.discord.core.config.interface(
			this.heart,
			{ name: 'buggymsgs', plugin: this.getName() },
			{
				config: {
					permissions: {
						buggymsgs_command: undefined,
						message_filter_event: undefined,
					},
				}
			},
		);
		const loadbuggymsgsConfig = await this.heart.core.discord.core.config.manager.load(buggymsgsConfig);
		if (!loadbuggymsgsConfig) {
			this.setDisabled();
			this.heart.core.console.log(this.heart.core.console.type.error, `Disabling plugin ${this.getName()}...`);
			return;
		}
	}

	async load() {
		this.heart.core.console.log(this.heart.core.console.type.startup, 'The plugin is loading now...');
		this.heart.core.discord.core.handler.manager.register(new buggymsgsHandler(this.heart));
	}
};