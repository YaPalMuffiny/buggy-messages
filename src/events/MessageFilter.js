const event = require('../../../../main/discord/core/events/event.js');
const { Events } = require('discord.js');

/* eslint-disable no-unused-vars, no-constant-condition */
if (null) {
	const heartType = require('../../../../types/heart.js');
	const eventType = require('../../../../types/discord/core/events/events.js');
	const { Message } = require('discord.js');
}
/* eslint-enable no-unused-vars, no-constant-condition  */

/**
 * Message filter event class.
 * @class
 * @extends eventType
 */
module.exports = class messageFilter extends event {
	/**
     * Creates an instance of the event.
     * @param {heartType} heart - The heart of the bot.
     */
	constructor(heart) {
		const config = this.heart.core.discord.core.config.manager.get('buggymsgs').get();
		super(heart, { 
			name: 'messageFilter', 
			event: { 
				discord: Events.MessageCreate, 
				bypassManager: false, 
				dm: false, 
				bypassRestrictions: true, 
				permissionLevel: config.config.permissions.message_filter_event,
			} 
		});
	}

	/**
     * Executes the event.
     * @param {Message} message - The message object.
     */
	async execute(message) {
		try {
			// Ignore bot messages
			if (message.author.bot) return;

			const buggymsgsModel = this.heart.core.database.getModel('buggymsgs').getModel();
			
			// Check if emoji only is enabled for this channel
			const buggymessagesEnabled = await buggymsgsModel.findOne({
				guildId: message.guild.id,
				userId: message.author.id
			});

			if (!buggymessagesEnabled) return;

			// Remove custom emojis from content before checking
			let contentToCheck = message.content.replace(/<a?:\w+:\d+>/g, '');
			
			// Check if remaining content contains letters or numbers
			if (/[a-zA-Z0-9]/.test(contentToCheck)) {
				await message.delete();
			}
		}
		catch (err) {
			this.heart.core.console.log(this.heart.core.console.type.error, `An issue occurred while executing event ${this.getName()}`);
			new this.heart.core.error.interface(this.heart, err);
		}
	}
};