const Enmap = require("enmap");

module.exports = {
	settings: new Enmap({
		name: "voteTable",
		autoFetch: true,
		fetchAll: false
	}),
	voteState: new Enmap("voteState"),
	//set all options for the user
	//key-voteOption {alive/dead votedAgainst [0-N] hasVoted [t/f]}
	//currently does not track what has the user voted for. 
	voteInfo: new Enmap({name : "voteInfo"})
}


