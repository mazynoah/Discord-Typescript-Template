import { Colors } from "discord.js";
import { Command } from "../../utils/command.js";

export default new Command({
    name: "ping",
    description: "Returns the ping of the bot",
    execute: async ({ bot, interaction }) => {
        interaction.followUp({
            embeds: [
                {
                    title: `Ping ${bot.client.ws.ping}ms`,
                    footer: {
                        text: `TypeScriptBot v${process.env.npm_package_version} by Amily404`,
                        icon_url: "https://avatars.githubusercontent.com/u/90854922?v=4"
                    },
                    color:
                        bot.client.ws.ping < 150
                            ? Colors.Green
                            : bot.client.ws.ping < 300
                                ? Colors.Orange
                                : Colors.Red
                }
            ]
        })
    }
});