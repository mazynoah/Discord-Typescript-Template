import { Colors, EmbedBuilder } from "discord.js";
import { Command } from "../../utils/command.js";

export default new Command({
    name: "ping",
    description: "Returns the ping of the bot",
    execute: async ({ bot, interaction }) => {
        interaction.reply({

            embeds: [
                new EmbedBuilder()
                    .setTitle(`Ping ${bot.client.ws.ping}ms`)
                    .setFooter({
                        text: `Typescript-Template v${process.env.npm_package_version} by ddelicious`,
                        iconURL: "https://avatars.githubusercontent.com/u/90854922?v=4"
                    })
                    .setColor(
                        bot.client.ws.ping < 150
                            ? Colors.Green
                            : bot.client.ws.ping < 300
                                ? Colors.Orange
                                : Colors.Red
                    )
            ]
        })
    }
});