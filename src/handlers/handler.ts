import { promisify } from "util";
import pkg from 'glob';
import { Collection } from "discord.js";
import { CommandOptions } from "../utils/command.js";
import { MsgCommandOptions } from "../utils/msgCommand.js";
const { glob } = pkg;
const globPromise = promisify(glob);

export async function initializeCommands() {
    // Import and set up events
    const eventFiles = await globPromise(`${process.cwd()}/dist/events/*.js`);
    eventFiles.map(async (value) => await import("file://" + value));

    // Collect all commands
    const slashCommands = await globPromise(
        `${process.cwd()}/dist/commands/*/*.js`
    );

    // Load all commands
    const commands = new Collection();
    slashCommands.forEach(async (value) => {
        const command = await import("file://" + value);
        commands.set(command.default.name, command.default);
    });
    return commands as Collection<string, CommandOptions> | null;
};

export async function initializeMsgCommands() {
    // Collect all commands
    const msgCommands = await globPromise(
        `${process.cwd()}/dist/commands_legacy/*/*.js`
    );

    // Load all commands
    const commands = new Collection();
    msgCommands.forEach(async (value) => {
        const command = await import("file://" + value);
        commands.set(command.default.name, command.default);
    })

    return commands as Collection<string, MsgCommandOptions> | null;
}