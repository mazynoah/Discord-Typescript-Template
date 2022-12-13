import { ApplicationCommandOptionType, GuildMember, EmbedBuilder } from "discord.js";
import { Color } from "../../index.js";
import { Command } from '../../utils/command.js';

export default new Command({
    name: "avatar",
    description: "Show your or another person's avatar",
    options: [
        {
            name: "member",
            description: "The member whose avatar you wish to see",
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    execute: async ({ interaction }) => {
        const Target = interaction.options.getMember("member") as GuildMember || interaction.member;

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(Color.Primary)
                    .setTitle(`${Target.displayName}'s avatar`)
                    .setAuthor({ name: Target.displayName, iconURL: Target.displayAvatarURL() })
                    .setFooter({ text: "eh.. they could look better (¬_¬) ", iconURL: Target.displayAvatarURL() })
                    .setImage(Target.displayAvatarURL({
                        size: 1024
                    }))
            ]
        });
    }
})