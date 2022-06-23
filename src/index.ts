import { Client, Collection, Intents, ClientOptions } from "discord.js";
import 'dotenv/config'
import initializeCommands from "./handlers/handler.js";
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

export type Options = {
    token: string,
} & ClientOptions;

async function initClient(config: Options): Promise<Bot> {

    const client = new Client(config);

    client.login(config.token);

    return {
        client: client,
        commands: await initializeCommands(),
        devGuild: process.env.GUILD ? process.env.GUILD : ""
    }

}

const bot = await initClient({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    token: process.env.TOKEN!
});

export default bot;