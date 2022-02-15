import { CommandInteraction, GuildMember } from 'discord.js';
import bot from '../index.js';

bot.client.on("interactionCreate", async (interaction) => {

    if (interaction.isCommand()) {
        await interaction.deferReply()

        const { commandName } = interaction;
        const command = bot.commands!.get(commandName);

        if (command) command.execute({ bot, interaction: interaction as CommandInteraction & { member: GuildMember; } });
    }
})