var serverRequest = new XMLHttpRequest(),
	serverInfo;

serverRequest.open("GET", "http://api.minetools.eu/ping/play.hiccup01.com/25565", true);
serverRequest.onreadystatechange = function(){
	if(serverRequest.readyState === XMLHttpRequest.DONE && serverRequest.status === 200){
		serverInfo = JSON.parse(serverRequest.responseText);
		loadData();
	}
};
serverRequest.send();

function loadData(){
	if(!serverInfo.hasOwnProperty("error")){
		var playerInfo = serverInfo.players;
		document.getElementById("server-icon").setAttribute("src", serverInfo.favicon);
		document.getElementById("version").textContent = serverInfo.version.name;
		//document.getElementById("server-description").textContent = serverInfo.description;
		document.getElementById("server-description").appendChild(serverInfo.description.replaceColorCodes());
		document.getElementById("amount-of-players").textContent = playerInfo.online + "/" + playerInfo.max;
		if(playerInfo.online > 0){
			for(var i = 0; i < playerInfo.online; i++){
				var container = document.createElement("div");
				container.className = "player";
				
				var icon = document.createElement("img");
				icon.setAttribute("src", "https://crafatar.com/avatars/" + playerInfo.sample[i].id + "?size=40&overlay");
				
				var playerName = document.createElement("p");
				playerName.textContent = playerInfo.sample[i].name;
				
				container.appendChild(icon);
				container.appendChild(playerName);
				document.getElementById("player-list").appendChild(container);
			}
		}else{
			var noPlayers = document.createElement("p");
			noPlayers.textContent = "No players online";
			document.getElementById("player-list").appendChild(noPlayers);
		}
	}else{
		var errorMessage = document.createElement("p");
		errorMessage.textContent = serverInfo.error;
		document.getElementById("player-list").appendChild(errorMessage);
	}
	
	document.getElementById("loading-label").textContent = "QuatCraft";
}