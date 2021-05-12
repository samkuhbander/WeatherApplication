var lat;
var lon;

	function zipRetrieve(zip){
		a=$.ajax({
				url: 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode/?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids='+zip, method: "GET"
			}).done(function(data) {
					$("#zipCode").html("<br>Zip Code: "+data.resource[0].zip);
					$("#city").html("<br>City: "+data.resource[0].city);
					$("#state").html("<br>State: "+data.resource[0].state);
					$("#latitude").html("<br>Latitude: "+data.resource[0].latitude);
					$("#longitude").html("<br>Longitude: "+data.resource[0].longitude);
					$("#timezone").html("<br>Timezone: "+data.resource[0].timezone);
					$("#daylightSavings").html("<br>Daylight Savings: "+data.resource[0].daylightSavingsFlag);
			}).fail(function(error) {
				console.log(error);
			});
		}
	function zipForecast(zip) {
			var icons = [];
		a=$.ajax({
                                url: 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode/?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids='+zip, method: "GET"
                        }).done(function(data) {
				lat = data.resource[0].latitude;
				lon = data.resource[0].longitude;
				
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
					for(let i=0; i<=7;i++){
						icons.push(data.daily[i].weather[0].icon);
					}
					$("#day1").html("");
					$("#day1").append("Weather: " + data.daily[0].weather[0].main + "<br>");
					$("#day1").append("Low: " + temp(data.daily[0].temp.min) + "<br>");
					$("#day1").append("High: " + temp(data.daily[0].temp.max)  + "<br>");
					$("#day1").append("<img src='" + icons[0] + "_2x.png'><br>");
					$("#day1").append(getWeekDay(0));

					$("#day2").html("");
					$("#day2").append("Weather: " + data.daily[1].weather[0].main + "<br>");
					$("#day2").append("Low: " + temp(data.daily[1].temp.min) + "<br>");
					$("#day2").append("High: " + temp(data.daily[1].temp.max)  + "<br>");
					$("#day2").append("<img src='" + icons[1] + "_2x.png'><br>");
					$("#day2").append(getWeekDay(1));

					$("#day3").html("");
					$("#day3").append("Weather: " + data.daily[2].weather[0].main + "<br>");
					$("#day3").append("Low: " + temp(data.daily[2].temp.min) + "<br>");
					$("#day3").append("High: " + temp(data.daily[2].temp.max)  + "<br>");
					$("#day3").append("<img src='" + icons[2] + "_2x.png'><br>");
					$("#day3").append(getWeekDay(2));

					$("#day4").html("");
					$("#day4").append("Weather: " + data.daily[3].weather[0].main + "<br>");
					$("#day4").append("Low: " + temp(data.daily[3].temp.min) + "<br>");
					$("#day4").append("High: " + temp(data.daily[3].temp.max)  + "<br>");
					$("#day4").append("<img src='" + icons[3] + "_2x.png'><br>");
					$("#day4").append(getWeekDay(3));

					$("#day5").html("");
					$("#day5").append("Weather: " + data.daily[4].weather[0].main + "<br>");
					$("#day5").append("Low: " + temp(data.daily[4].temp.min) + "<br>");
					$("#day5").append("High: " + temp(data.daily[4].temp.max)  + "<br>");
					$("#day5").append("<img src='" + icons[4] + "_2x.png'><br>");
					$("#day5").append(getWeekDay(4));

					$("#day6").html("");
					$("#day6").append("Weather: " + data.daily[5].weather[0].main + "<br>");
					$("#day6").append("Low: " + temp(data.daily[5].temp.min) + "<br>");
					$("#day6").append("High: " + temp(data.daily[5].temp.max)  + "<br>");
					$("#day6").append("<img src='" + icons[5] + "_2x.png'><br>");
					$("#day6").append(getWeekDay(5));

					$("#day7").html("");
					$("#day7").append("Weather: " + data.daily[6].weather[0].main + "<br>");
					$("#day7").append("Low: " + temp(data.daily[6].temp.min) + "<br>");
					$("#day7").append("High: " + temp(data.daily[6].temp.max)  + "<br>");
					$("#day7").append("<img src='" + icons[6] + "_2x.png'><br>");
					$("#day7").append(getWeekDay(6));

					var pass = sqlDate();
					console.log(pass);
					addHistory(pass, zip, temp(data.daily[0].temp.min), temp(data.daily[0].temp.max), data.daily[0].weather[0].main);
				}).fail(function(error) {
                                	console.log(error);
                        	});

                        }).fail(function(error) {
                                console.log(error);
                        });
	}

	function sqlDate(){
                var d = new Date();
		var year = d.getFullYear();
                var month = d.getMonth()+1;
                var day = d.getDate();
                var date = year + "-" + month + "-" + day;
                return date;
	}

	function addHistory(date, loc, low, high, forecast){
		var data = {
			date:date,
			location:loc,
			low:low,
			high:high,
			forecast:forecast
		};
		$.post('https://kuhbansc.aws.csi.miamioh.edu/final.php?method=setTemp',data);
	}

	function getHistory(search, order){
		$.getJSON('https://kuhbansc.aws.csi.miamioh.edu/final.php?method=getTemp&date='+search+'&sort='+order, function(data) {
			if($("#reset").length>0){
				$("#request").empty();
				$("#request").append("<thead class='thead-dark'> <th>Location </th> <th>Date </th> <th>Low </th> <th>High </th> <th>Forecast </th> </thead>");

 			}
			for(let i=0; i<data.result.length; i++){
				$("#request").append("<tr id='reset'> <td>Location: " + data.result[i].location + "</td> <td>Date: " + data.result[i].DateRequested + "</td> <td>Low: " + data.result[i].Low + "</td> <td>High: " + data.result[i].High + "</td> <td>Forecast: " + data.result[i].Forecast + "</td></tr>");
			}
		});
	}

	function temp(kelvin){
		far = ((kelvin-273.15)*1.8)+32;
		return far.toFixed(2); 
	}

	function getWeekDay(numb){
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
		var d = new Date();
		var name = d.getDay();
                var dayName = days[((name+numb)%7)];
                var month = months[d.getMonth()];
                var day = d.getDate()+numb;
                var date = dayName+ " " + month + " " + day;
		return date;
	}

