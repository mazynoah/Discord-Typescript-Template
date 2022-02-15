import { promisify } from "util";
import { Bot } from "../index.js";
import pkg from 'glob';
const { glob } = pkg;
const globPromise = promisify(glob);

export default async (bot:Bot) => {
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/dist/events/*.js`);
    eventFiles.map(async (value) => await import("file://" + value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/dist/commands/*/*.js`
    );

    slashCommands.map(async (value) => {

        const file = await import("file://" + value);
        const command = file.default;
        if (!command?.name) return;
        bot.commands!.set(command.name, command);

        //if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    });
};