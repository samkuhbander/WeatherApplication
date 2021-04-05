	var URL="http://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
        var loadCounter=0;
        var errorCounter=0;
        loadavg();
	getUsers();
	getNetwork();  
        function loadavg() {
        a=$.ajax({
                url: "http://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/loadavg",
                method: "GET"
        }).done(function(data) {
                loadCounter++;
                $("#loadRun").html(loadCounter);
                $("#onemin").html(data.loadavg.OneMinAvg);
                $("#fivemin").html(data.loadavg.FiveMinAvg);
		$("#fifteenmin").html(data.loadavg.FifteenMinAvg);
		$("#numRunning").html(data.loadavg.NumRunning);
		$("#ttlProc").html(data.loadavg.TtlProcesses);                
		setTimeout(loadavg,1000);
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Load Avg error "+new Date()+"<br>");
                $("#logRun").html(errorCounter);
                setTimeout(loadavg,1000);
        });
}
var userCounter=0;

	function getUsers() {
	a=$.ajax({
		url: URL + '/vi/api/who',
		method: "GET"
	}).done(function(data) {
		userCounter++;
		$("#usersRun").html(userCounter);
		len = data.who.length;
		//Clear out old data
		$("#users").html("");
		for (i=0;i<len;i++){
			$("#users").append("<tr><td>" + data.who[i].uid + "</td><td>" + data.who[i].ip + "</td></tr>");
		}
		setTimeout(getUsers,1000);
	}).fail(function(error) {
		errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("User error "+new Date()+"<br>");
                $("#logRun").html(errorCounter);
                setTimeout(getUsers,1000);
	});
}

var networkCount = 0;
var txbytes;
var rxbytes;
var txChange, rxChange;

	function getNetwork() {
	a=$.ajax({
                url: URL + '/vi/api/network',
                method: "GET"
        }).done(function(data) {
		networkCount++;
		$("#networkRun").html(networkCount);
		txChange = txbytes;
		rxChange = rxbytes;  
		txbytes = data.network.txbytes;
		rxbytes = data.network.rxbytes;
		txChange = txbytes - txChange;
		rxChange = rxbytes - rxChange; 
		$("#txbytes").html(txbytes);
		$("#rxbytes").html(rxbytes);
		$("#txavg").html(txChange);
		$("#rxavg").html(rxChange);
		setTimeout(getNetwork, 1000);
	}).fail(function(error) {
		errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Network error "+new Date()+"<br>");
                $("#logRun").html(errorCounter);
                setTimeout(getUsers,1000);
	});
}
