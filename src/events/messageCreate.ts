import { ApplicationCommandDataResolvable } from "discord.js";
import bot from "../index.js";

bot.client.on("messageCreate", async (message) => {
    if (message.channel.type === "DM") return;
    if (message.author.bot) return;
    if (message.author.id != "YOUR_ID") return console.warn("Please insert your id.");




    let prefix = "!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift()?.toLowerCase();

    //Initialize commands
    if (cmd === "setup") {
        await message.reply({ content: "starting setup..."});
        console.log("Initializing commands...");

        const guild = bot.client.guilds.cache.get(bot.devGuild);
        if (guild) guild.commands.set([]);
        else bot.client.application?.commands.set([]);

        let cmd = guild ? guild.commands : bot.client.application?.commands;

        console.log(bot.commands);

        await cmd?.set(bot.commands! as unknown as ApplicationCommandDataResolvable[]);

        message.reply({ content: "Done!" });
        console.log("Done");
    }
});
