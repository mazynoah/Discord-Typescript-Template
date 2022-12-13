import { CommandMsg } from "../../utils/msgCommand.js";

export default new CommandMsg({
    name: "reset",
    description: "Deletes all registered command from discord",
    execute: async ({ bot, message }) => {
        if (message.author.id != process.env.ADMIN_ID) return;

        await message.reply({ content: "Reset application and guild commands..." });
        console.log("Reset application and guild commands...");

        // delete commands from every guild
        bot.client.guilds.cache.forEach((guild) => {
            guild.commands.set([])
        })

        bot.client.application?.commands.set([]);

        message.reply({ content: "Reset application and guild commands complete" });
        console.log("Reset application and guild commands complete");
    }
})