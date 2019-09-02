let mafiaChat;

var votingStarted = 0
var votingEnded = 0
var fs = require('fs');
//
module.exports = {
	processVote,
	processCommand
}

function processVote (receivedMessage) {
	if (votingStarted && !votingEnded) {
		//If the voting is on-going
		receivedMessage.react("👍")
		let messageString = receivedMessage.content.toString()
		let splitMessage = messageString.split(":")
		let vote = splitMessage[1].replace(/\*/g, "")

		console.log("Received vote for: --" + vote + "-- from " + receivedMessage.author.username.toString())
		//Update a struct with who voted and for who
	} 

	
}

function processCommand (receivedMessage) {
	let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command

    console.log("Command received: " + primaryCommand)
    //Check that author is admin
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
