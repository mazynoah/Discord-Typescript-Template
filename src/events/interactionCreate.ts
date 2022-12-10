import bot from '../index.js';
import { BotCommandInteraction } from "../utils/command.js";

bot.client.on("interactionCreate", async (interaction) => {
    if (!interaction.channel) {
        return;
    }

    if (interaction.isCommand()) {
        const { commandName } = interaction;
        const command = bot.commands!.get(commandName);

        if (command) command.execute({ bot, interaction: interaction as BotCommandInteraction });
    }
})