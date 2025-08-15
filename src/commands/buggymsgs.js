const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const command = require('../../../../main/discord/core/commands/command.js');

/* eslint-disable no-unused-vars, no-constant-condition */
if (null) {
	const heartType = require('../../../../types/heart.js');
	const commandType = require('../../../../types/discord/core/commands/commands.js');
	const { CommandInteraction } = require('discord.js');
}
/* eslint-enable no-unused-vars, no-constant-condition  */


/**
 * buggy messages toggle command class.
 * @class
 * @extends commandType
 */
module.exports = class buggymessagestoggle extends command {
	/**
     * Creates an instance of the command.
     * @param {heartType} heart - The heart of the bot.
     * @param {Object} cmdConfig - The command configuration.
     */
	constructor(heart, cmdConfig) {
		const config = this.heart.core.discord.core.config.manager.get('buggymsgs').get();
		super(heart, {
			name: 'buggymsgs',
			data: new SlashCommandBuilder()
				.setName(cmdConfig.commands.buggymsgs?.name || 'buggymsgs')
				.setDescription(cmdConfig.commands.buggymsgs?.description || 'Make a persons messages "buggy"')
				.addUserOption(option => option.setName('victim').setDescription('Which person?').setRequired(true)),
			contextMenu: false,
			global: true,
			category: 'general',
			bypass: true,
			permissionLevel: config.config.permissions.buggymsgs_command,
		});
	}

	/**
     * Executes the command.
     * @param {CommandInteraction} interaction - The interaction object.
     * @param {Object} langConfig - The language configuration.
     */
	async execute(interaction, langConfig) {
		const user = interaction.options.getUser('user') ?? interaction.user;
		try {
			const buggymsgsModel = this.heart.core.database.getModel('buggymsgs').getModel();
			
			// Check if channel already has buggymessages onlyenabled
			const existingRecord = await buggymsgsModel.findOne({
				guildId: interaction.guild.id,
				userId: user.id
			});
			console.log(user.id)

			if (existingRecord) {
				// Remove buggy messages only from channel
				await buggymsgsModel.deleteOne({
					guildId: interaction.guild.id,
					userId: user.id
				});
				interaction.reply({ content: `Buggy Messages has been **disabled** for ${user}!`, flags: MessageFlags.Ephemeral });
			} else {
				// Add buggy messages only to channel
				await buggymsgsModel.create({
					version: 1,
					guildId: interaction.guild.id,
					userId: user.id
				});
				interaction.reply({ content: `Buggy Messages has been **enabled** for ${user}!`, flags: MessageFlags.Ephemeral });
			}
		}
		catch (err) {
			this.heart.core.console.log(this.heart.core.console.type.error, `An issue occured while executing command ${this.getName()}`);
			new this.heart.core.error.interface(this.heart, err);
			interaction.reply({ embeds: [this.heart.core.util.discord.generateErrorEmbed(langConfig.lang.unexpected_command_error.replace(/%command%/g, `/${interaction.commandName}`))], flags: MessageFlags.Ephemeral });
		}
	}
};