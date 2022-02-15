import { Client, Collection, Intents, ClientOptions } from "discord.js";
import 'dotenv/config'
import handler from "./handlers/handler.js";
import { CommandOptions } from "./utils/command.js";

export enum Color {
    CYAN = "#53F5E1",
    PINK = "#E395F5",
    RED = "#F5718D",
    YELLOW = "#F5EE7D",
    ORANGE = "#F59469",
    GREEN = "#5AF580"
}
export interface Bot {
    client: Client,
    commands: Collection<string, CommandOptions> | null,
    devGuild: string
    [key: string]: any
}

function initClient(config: ClientOptions): Bot {

    const client = new Client(config);

    return {
        client: client,
        commands: new Collection(),
        devGuild: process.env.GUILD ? process.env.GUILD : ""
    }

}

const bot = initClient({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

//Initalize the bot
handler(bot);

bot.client.login(process.env.TOKEN);

export default bot;