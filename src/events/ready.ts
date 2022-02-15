import bot from "../index.js";

bot.client.on("ready", () => {
    console.log(`Logged in as ${bot.client.user?.tag}`);
});
