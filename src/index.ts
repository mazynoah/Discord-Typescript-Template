import { Client, Collection, GatewayIntentBits, ClientOptions, Partials } from "discord.js";
import 'dotenv/config'
import { initializeCommands, initializeMsgCommands } from "./handlers/handler.js";
import { CommandOptions } from "./utils/command.js";
import { MsgCommandOptions } from "./utils/msgCommand.js";

export enum Color {
    Primary = 0xD99F6C,
    Secondary = 0xD96941,
    Background = 0x110100
}

export interface Bot {
    client: Client,
    commands: Collection<string, CommandOptions> | null,
    commandsMsg: Collection<string, MsgCommandOptions> | null,
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
        commandsMsg: await initializeMsgCommands(),
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