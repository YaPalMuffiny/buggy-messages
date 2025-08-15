const modelBuilder = require('../../../../main/core/database/modelBuilder.js');

module.exports = class emojiOnlyModel extends modelBuilder {
	constructor() {
        // Import this model using "this.heart.core.database.getModel('emojiOnly').getModel()".
		super('buggymsgs', {
			version: Number,
			guildId: String,
			userId: String,
		});
	}
};