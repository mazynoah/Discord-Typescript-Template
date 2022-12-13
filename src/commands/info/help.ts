import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, Message } from "discord.js";
import { Color } from "../../index.js";
import { Command } from "../../utils/command.js";
import EmbedPage from "../../utils/embedPage.js";

export default new Command({
    name: "help",
    description: "Iterates every commands",
    execute: async ({ bot, interaction }) => {
        await interaction.deferReply();

        const msgCommands = bot.commandsMsg!.map((cmd) => {
            return { name: `!${cmd.name}`, description: cmd.description }
        })

        const commands = [...msgCommands, ...bot.commands!.map((cmd) => {
            return { name: cmd.name, description: cmd.description }
        })];
        const embedPage = new EmbedPage();

        // slice the commands into arrays of 10 items each to make pages
        const pages = commands.reduce((acc, cmd, index) => {
            const page = Math.floor(index / 5);
            if (!acc[page]) acc[page] = [];
            acc[page].push({ name: cmd.name, value: cmd.description });
            return acc;
        }, [] as any[]);

        // set up paged Embed
        pages.forEach((page, index) => {
            const embed = new EmbedBuilder()
                .setTitle(`Help #${index + 1}`)
                .setFields(page)
                .setColor(Color.Secondary)
                .setFooter({
                    text: `Page ${index + 1}/${pages.length}`
                });
            embedPage.addPage(embed);
        })

        // set up buttons
        const buttons = [
            new ButtonBuilder()
                .setLabel("◁")
                .setCustomId("help-back")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setLabel("▷")
                .setCustomId("help-forward")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setLabel(`Requested by ${interaction.user.tag}`)
                .setCustomId("requested")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
        ];

        const actionRow = new ActionRowBuilder<ButtonBuilder>({ components: buttons });

        // send message
        const message = await interaction.followUp({
            embeds: [
                embedPage.getCurrentPage()
            ],
            components: [actionRow],
            fetchReply: true
        }) as Message<boolean>;

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: /*120000*/ 10000 });

        // button response handler
        collector.on('collect', async i => {
            if (i.user.id != interaction.user.id)
                await i.reply({ content: `These buttons aren't for you!`, ephemeral: true });

            if (i.customId === "help-back") {
                await interaction.editReply({
                    embeds: [
                        embedPage.previousPage()
                    ],
                })
            } else if (i.customId === "help-forward") {
                await interaction.editReply({
                    embeds: [
                        embedPage.nextPage()
                    ],
                })
            }
            await i.deferUpdate();
        });

        // disable buttons after expired
        collector.on('end', (i) => {
            buttons.forEach((button: any) => {
                button.setDisabled(true);
                console.log(button);
                if (button.data.custom_id === "requested")
                    button.data.label = `Expired after ${collector.options.time! / 1000} seconds`;
            });
            interaction.editReply({
                components: [actionRow.setComponents(buttons)]
            });
        })
    }
});