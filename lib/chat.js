let mafiaChat;
var fs = require('fs');
const vote = require('./vote.js');
const db = require('./db.js');

module.exports.processVote = (receivedMessage) => {
    //Check that the vote has started
    if(db.voteState.get('voteState')) {
        //two scenarios. **Vote or **unvote
        if (receivedMessage.content.startsWith("**vote")) {
            //If the voting is on-going
            receivedMessage.react("👍")
            let messageString = receivedMessage.content.toString()
            let splitMessage = messageString.split(":")
            let playerVoted = splitMessage[1].replace(/\*/g, "")
            let voter = receivedMessage.author.username.toString()
            console.log("Received vote for: --" + playerVoted + "-- from " + voter)
            db.voteInfo.set(voter, {vote: playerVoted});
            //Update a struct with who voted and for who
        } else if (receivedMessage.content.startsWith("**unv")) {
            //Player is unvoting, look at the struct and remove his vote from the corresponding player.
            //Let the player know that bot read the message
            receivedMessage.react("👍")
            let messageString = receivedMessage.content.toString();
            let voter = receivedMessage.author.username.toString();
            //Remove vote
            db.voteInfo.set(voter, {vote: ""});
        }  
    }
}

module.exports.processCommand = (receivedMessage) => {
	//Load the enmap
	// enmap_data.defer
	let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let args = splitCommand.slice(1) // All other words are arguments/parameters/options for the command 
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + args) // There may not be any arguments

    let voter = receivedMessage.author.username.toString();
    
    //TODO:Check that author is admin for some
    switch (primaryCommand) {
    	case "startVote":
			receivedMessage.channel.send("Ok! I will start recording votes now.")
			//Save the vote state
			db.voteState.set(true);
    		break;
    	case "endVote":
    		receivedMessage.channel.send("Ok! I will stop recording votes now.")
    		//Load the enmap with all keys
			db.voteState.set(false);
    		break;
    	case "setVotes":
            //Initialize at the beggining of the game. Enter all players.
    		args.forEach((player) => {
    			vote.setVoteOptions(player)
    		})
    		
    		receivedMessage.channel.send("Ok! Those are the valid votes.")
    		break;
    	case "voteOptions":
            //Get all the voting options for the current day
            receivedMessage.channel.send("Ok! You can vote for the following alive players:")
    		let voteOptions = vote.getVoteOptions()
            voteOptions.forEach((option) => {
                receivedMessage.channel.send(option)
            });
    		break;
        case "getVoteInfoFor":
            //Get what has certain player has voted for (debug use)
            let votedFor = vote.getVote(args);
            receivedMessage.channel.send(args + "has voted for: " + votedFor);
            break;
        case "voteTally":
            //Get the current tally of votes.
            //Player - Votes against (count) -Who voted for them
            //No Lynch/Abstain -- Votes against (count) -Who voted for them
            //Not voting: List not-voters.
            break;
        case "killPlayer":
            //Only usable by game admin and via DM (maybe?)
            vote.killPlayer(args);
            break;
        case "getNoneVoters":
            //get all players that are currently not voting
            let nonVoters = vote.getNoneVoters()
            receivedMessage.channel.send("The following players are not voting:")
            nonVoters.forEach((loser) => {
                receivedMessage.channel.send(loser)
            })
    	default:
    		receivedMessage.channel.send("I don't understand the command.")
    }
   


}
