# Discord-Typescript-Template
Typescript template for a discord bot using **[discord.js](https://discord.js.org)**.
## Installation

### Clone the repository

```sh
> git clone https://github.com/formal-pancake/Discord-Typescript-Template.git
```

### Install **required depedencies**

```sh
> npm install
```

### Install **Typesript globally**

```sh
> npm install -g typescript
```

## Getting Started

First of all, you will need to create a `.env` file in the root directory:

```js
TOKEN = "YOUR_TOKEN"
GUILD = "YOUR_GUILD_ID"
ADMIN_ID = "YOUR_USER_ID"
```
> Setting up a GUILD variable is only needed during development. 
<br> You can find you bot's `TOKEN` on the [Discord dev Portal](https://discord.com/developers/applications)

## Starting The Bot

Once you completed all the steps above, all you have to do is start the app:

```sh
> npm run start
```

## Registering Slash Commands

To register all slash commands located in `./src/commands`, send `!setup` in a server where you added the bot.

> If a guild id is provided in the `.env`, commands will register for that guild specifically. Remove it to register them application wide.
