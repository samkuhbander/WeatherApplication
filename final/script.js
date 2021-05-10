
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
