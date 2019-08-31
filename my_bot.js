const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "!"
var votingStarted = 0
var votingEnded = 0
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


	if (receivedMessage.content.startsWith(prefix)) {
		// console.log("User has sent a command")
		processCommand(receivedMessage)		
	}

	if (votingStarted && !votingEnded) {
		//Voting has started 
		if (receivedMessage.content.startsWith("**vote:") && receivedMessage.content.endsWith("**")) {
			receivedMessage.react("👍")
			processVote(receivedMessage)
		}
	}

})

function processVote(receivedMessage) {
	let messageString = receivedMessage.content.toString()
	let splitMessage = messageString.split(":")
	let vote = splitMessage[1].replace(/\*/g, "")

	console.log("Received vote for: --" + vote + "-- from " + receivedMessage.author.username.toString())
}

function processCommand (receivedMessage) {
	let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command

    console.log("Command received: " + primaryCommand)
    if (primaryCommand == "startVote") {
		receivedMessage.channel.send("Ok! I will start recording votes now.")
		votingStarted = 1
    } else if (primaryCommand == "endVote") {
    	receivedMessage.channel.send("Ok! I will stop recording votes now.")
		votingStarted = 0
		votingEnded = 1
    } else {
    	receivedMessage.channel.send("I don't understand the command.")
    }


}
//Bot's secret token
bot_secret_token = "NjE2ODc5NjIxNTI2NTE5ODA5.XWp-6w.1TfSyffmhWQ_llCEHrZipJpeNCc"

client.login(bot_secret_token)

