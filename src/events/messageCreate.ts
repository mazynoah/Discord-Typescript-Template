import bot from "../index.js";

const prefix = "!";

bot.client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift()?.toLowerCase();

    if (!cmd) return;

    const command = bot.commandsMsg!.get(cmd);
    if (command) command.execute({ bot, message });
});