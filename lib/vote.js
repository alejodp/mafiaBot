const db = require("./db.js"); 


const Enmap = require("enmap");
// non-cached, auto-fetch enmap: 
const enmap_data = new Enmap({
  name: "voteTable",
  autoFetch: true,
  fetchAll: false
});



//set vote options (alive + no lynch and abstain)
module.exports.setVoteOptions = (aliveUser) => {
	db.voteInfo.set(aliveUser, {
		status: "alive",
		hasVoted: false,
		vote: ""
	});
}

//Set player as dead.
module.exports.killPlayer = (deadUser) => {
	db.voteInfo.set(aliveUser, {
		status: "dead"
	})
}

//get vote options 
module.exports.getVoteOptions = () => {
	return db.voteInfo.getKeys()
}

//get the provided user vote
module.exports.getVoteInfo = (user) => {
	if (db.voteInfo.get(user, "status") == "alive") {
		return db.voteInfo.get(user, "vote");
	}
}


//return all players that are currently not voting
module.exports.getNoneVoters = () => {
	let players = db.voteInfo.getKeys()
	players.forEach((player) => {
		if ((db.voteInfo.get(user, "status") == "alive") && (!db.voteInfo.get(user,"hasVoted"))) {
			

		}
	})

	return noneVoters;
}
