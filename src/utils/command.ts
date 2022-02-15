import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    GuildMember,
    PermissionResolvable
} from "discord.js";
import { Bot } from "../index.js";

export interface ExecOptions {
    bot: Bot;
    interaction: CommandInteraction & { member: GuildMember };
}

export type ExecFunction = (options: ExecOptions) => any;

export type CommandOptions = {
    userPermissions?: PermissionResolvable[];
    execute: ExecFunction;
} & ChatInputApplicationCommandData;

export class Command {
    constructor(commandOptions: CommandOptions) {
        Object.assign(this, commandOptions);
    }
}