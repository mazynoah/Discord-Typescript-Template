import { Message } from "discord.js";
import { Bot } from "../index.js";

export interface ExecOptions {
    bot: Bot;
    message: Message<boolean>;
}

export type ExecFunction = (options: ExecOptions) => any;

export type MsgCommandOptions = {
    name: string,
    description: string,
    admin?: boolean,
    execute: ExecFunction;
}

export class CommandMsg {
    constructor(commandOptions: MsgCommandOptions) {
        Object.assign(this, commandOptions);
    }
}