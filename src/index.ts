import { Client, Collection, GatewayIntentBits, ClientOptions } from "discord.js";
import 'dotenv/config'
import initializeCommands from "./handlers/handler.js";
import { CommandOptions } from "./utils/command.js";

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
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    token: process.env.TOKEN!
});

export default bot;