import { promisify } from "util";
import pkg from 'glob';
import { Collection } from "discord.js";
import { CommandOptions } from "../utils/command.js";
const { glob } = pkg;
const globPromise = promisify(glob);

export default async () => {
    // Redirect events to the correct handler
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