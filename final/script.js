var lat;
var lon;

	function zipRetrieve(zip){
		a=$.ajax({
				url: 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode/?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids='+zip, method: "GET"
			}).done(function(data) {
					$("#zipCode").html("Zip Code: "+data.resource[0].zip);
					$("#city").html("City: "+data.resource[0].city);
					$("#state").html("State: "+data.resource[0].state);
					$("#latitude").html("Latitude: "+data.resource[0].latitude);
					$("#longitude").html("Longitude: "+data.resource[0].longitude);
					$("#timezone").html("Timezone: "+data.resource[0].timezone);
					$("#daylightSavings").html("Daylight Savings: "+data.resource[0].daylightSavingsFlag);
			}).fail(function(error) {
				console.log(error);
			});
		}
	function zipForecast(zip) {
		a=$.ajax({
                                url: 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode/?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids='+zip, method: "GET"
                        }).done(function(data) {
				lat = data.resource[0].latitude;
				lon = data.resource[0].longitude;
				console.log(lat);
				console.log(lon);
				
				a=$.ajax({
					url: "https://api.openweathermap.org/data/2.5/onecall",
					method: "GET",
				data: {
					"lat": lat,
					"lon": lon,
					"exclude": "hourly",
					"appid": "defe9caad8afe38ba65d7cee31b8515a" 
				}
				}).done(function(data) {
					console.log(data);
					$("#day1").append("Weather: " + data.daily[0].weather[0].main + "<br>");
					$("#day1").append("Low: " + data.daily[0].temp.min + "<br>");
					$("#day1").append("High: " + data.daily[0].temp.max  + "<br>");
					$("#day1").append(getDay(0));
				}).fail(function(error) {
                                	console.log(error);
                        	});

                        }).fail(function(error) {
                                console.log(error);
                        });
	}

	function getDay(numb){
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
                                var d = new Date()+numb;
				var name = days[d.getDay()];
				var month = months[d.getMonth()];
				var day = d.getDate();
				var output = name + " " + month + " " + day;
				return output;
	}

