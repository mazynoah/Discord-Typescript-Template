import { ApplicationCommandOptionType, GuildMember, EmbedBuilder } from "discord.js";
import { Color } from "../../index.js";
import { Command } from '../../utils/command.js';

export default new Command({
    name: "avatar",
    description: "ill show you the face of anyone",
    options: [
        {
            name: "member",
            description: "the guy with the face you know",
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
                    .setTitle(`look at that idiot lol`)
                    .setAuthor({ name: Target.displayName, iconURL: Target.displayAvatarURL() })
                    .setFooter({ text: "eh.. stupid (¬_¬) ", iconURL: Target.displayAvatarURL() })
                    .setImage(Target.displayAvatarURL({
                        size: 1024
                    }))
            ]
        });
    }
})