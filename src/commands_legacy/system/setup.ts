import { ApplicationCommandDataResolvable } from "discord.js";
import { CommandMsg } from "../../utils/msgCommand.js";

export default new CommandMsg({
    name: "setup",
    description: "Registers the slash commands",
    execute: async ({ bot, message }) => {
        if (message.author.id != process.env.ADMIN_ID) return;

        await message.reply({ content: "Sure let me set that up..." });
        console.log("Initializing commands...");

        // deletes devGuild or application commands
        const guild = bot.client.guilds.cache.get(bot.devGuild);
        if (guild) guild.commands.set([]);
        else bot.client.application?.commands.set([]);

        let cmd = guild ? guild.commands : bot.client.application?.commands;

        console.log(bot.commands);

        await cmd?.set(bot.commands! as unknown as ApplicationCommandDataResolvable[]);

        message.reply({ content: "ok i'm done" });
        console.log("Done");
    }
})