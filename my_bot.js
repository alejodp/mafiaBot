const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "!"
const chat = require('./lib/chat.js');
const config = require("./lib/config.json");

client.on('ready', () => {
	console.log("Connected as " + client.user.tag)
	//List of servers the bot is connected to
	// console.log("Servers:")
	client.guilds.forEach((guild) => {
		// console.log(" - " + guild.name)
		//List of channels
		guild.channels.forEach((channel) => {
			// console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name == "bot-test") {
				var botTestChannel = client.channels.get(channel.id)
				console.log(`Connected to server: ${guild.name} channel: ${channel.name}`)
				// botTestChannel.send("Hello World!")

			}
		})
	})
})

client.on('message', (receivedMessage) => {
	if (receivedMessage.author == client.user) {
		return
	}

	// // Check if the bot's user was tagged in the message
	if (receivedMessage.content.includes(client.user.toString())) {
	    // Send acknowledgement message
	    receivedMessage.channel.send("Message received from " +
	        receivedMessage.author.toString() + ": " + receivedMessage.content)
	}

	//User sent a command.
	if (receivedMessage.content.startsWith(prefix)) {
		// console.log("User has sent a command")
		chat.processCommand(receivedMessage)
	}

	//Process vote message
	if (receivedMessage.content.startsWith("**vote:") && receivedMessage.content.endsWith("**")) {
		chat.processVote(receivedMessage)
	}

})


client.login(config.token)

