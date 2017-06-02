// Javascript document
$(document).ready(function(e) {

		var date = new Date(),
			day = date.getDate(),
			month = date.getMonth() + 1,
			year = date.getFullYear(),
			hour = date.getHours(),
			minutes = date.getMinutes(),
			timer = $('.time');

			if(day < 10) {
				day = "0"+day+"";
			}
			if(month < 10) {
				month = "0"+month+"";
			}
			if(hour < 10) {
				hour = "0"+hour+"";
			}
			if(minutes < 10) {
				minutes = "0"+minutes+"";
			}
			
		timer.html(""+day+"."+month+"."+year+" - "+hour+":"+minutes+"")
		

		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude,
	    		long = position.coords.longitude;

			$.ajax({ 
			   type: "GET",
			   dataType: "json",//jsonp
			   url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=49141a2a067e3fce4eb9e8c29bafd28a",
			   success: function(data){
			      console.log(data);
			     	if (data.cod == 404){

			   			$('#place').html(data.message);
			   			$('#desc').html("lat: "+lat+" long: "+long+"");

			     	}
			     	else {
			     		var weatherArray = data.weather,
			     			weatherLength = weatherArray.length,
			     			weatherSelect = weatherLength - 1, // handle the weather Array
			     			temp = parseInt((data.main.temp - 273.15).toFixed(0)),
					     	loc = data.name,
					     	country = data.sys.country,
					     	humidity = data.main.humidity,
					     	pressure = data.main.pressure,
					     	windSpeed = parseInt((data.wind.speed * 3.6).toFixed(0)),
					     	windDeg = data.wind.deg,
					     	description = data.weather[0].description,
					     	weatherId = data.weather[0].id;

					    var temperature = $('.temperature'),
					    	place = $('.place'),
					    	descriptionOutput = $('.description'),
					    	humidityOutput = $('.humidity'),
					    	windSpeedOutput = $('.wind'),
					    	windDegOutput = $('.deg'),
					    	pressureOutput = $('.pressure'),
					    	background = $('.background');

					    place.html(""+loc+", "+country+"");
					    descriptionOutput.html(description);
						animateNumbers(temp, temperature, "°");
						animateNumbers(humidity, humidityOutput, " %");
						animateNumbers(windSpeed, windSpeedOutput, " kmh");
						animateNumbers(pressure, pressureOutput, " hPa");

						switch (weatherId) {
							case 200:
							case 201:
							case 202:
							case 210:
							case 211:
							case 212:
							case 221:
							case 230:
							case 231:
							case 232:
								background.css('background-image', 'url(img/200.jpg)');
								background.fadeIn();
								break;
							case 300:
							case 301:
							case 302:
							case 310:
							case 311:
							case 312:
							case 313:
							case 314:
							case 321:
								background.css('background-image', 'url(img/300.jpg)');
								background.fadeIn();
								break;
							case 500:
							case 501:
							case 502:
							case 503:
							case 504:
							case 511:
							case 520:
							case 520:
							case 521:
							case 522:
							case 531:
								background.css('background-image', 'url(img/500.jpg)');
								background.fadeIn();
								break;
							case 600:
							case 601:
							case 602:
							case 611:
							case 612:
							case 615:
							case 616:
							case 620:
							case 621:
							case 622:
								background.css('background-image', 'url(img/600.jpg)');
								background.fadeIn();
								break;
							case 701:
							case 711:
							case 721:
							case 731:
							case 741:
							case 751:
							case 761:
							case 762:
							case 771:
							case 781:
								background.css('background-image', 'url(img/700.jpg)');
								background.fadeIn();
								break;
							case 800:
								background.css('background-image', 'url(img/800.jpg)');
								background.fadeIn();
								break;
							case 801:
							case 802:
							case 803:
							case 804:
								background.css('background-image', 'url(img/80x.jpg)');
								background.fadeIn();
								break;
							default:
								background.css('background-image', 'url(img/default.jpg)');
								background.fadeIn();
								break;
						}
						

						function wait() {
							if (windDeg < 180) {
								var trueDeg = windDeg + 180;
								windDegOutput.css('transform', 'rotate('+trueDeg+'deg)');
							}
							else {
								var trueDeg = windDeg - 180;
								windDegOutput.css('transform', 'rotate('+trueDeg+'deg)');
							}
						}
						setTimeout(wait, 1000);

			     	}
			   },
			   error: function() {
			   		$('.infos').hide();
					$('.errorLog').fadeIn();
					$('.error').html("An error occurred with the service.<br>Please, try to refresh the page or try again later.");
			   }
			});
		}, function showError(error) {

			$('.infos').hide();
			$('.error').fadeIn();

		    switch(error.code) {
		        case error.PERMISSION_DENIED:
		            $('.error').html("It seems that you denied the request for Geolocation.<br>Please, refresh the page.")
		            break;
		        case error.POSITION_UNAVAILABLE:
		            $('.error').html("Your location information is unavailable.<br>Please, retry later.")
		            break;
		        case error.TIMEOUT:
		            $('.error').html("The request to get your location timed out.<br>Please, check that you are correctly connected to the internet and refresh the page.")
		            break;
		        case error.UNKNOWN_ERROR:
		            $('.error').html("An unknown error occurred.<br>Please, try to refresh the page or try again later.")
		            break;
		    };
		});

		function animateNumbers(n, output, string) {
			var i = -1,
				rate = 1000 / Math.abs(n);
			
			if (rate < 1) {
				rate = 1;
			}

			function increment() {
				if (rate == 1) {
					i+=3;
				}
				else {
					i++;
				}
				if (n != Math.abs(n)) {

					if (i <= Math.abs(n)) {
						output.html("-"+i+""+string+"");
					}

				}
				else {

					if (i <= n) {
						output.html(""+i+""+string+"");
					}
					
				}
				
			}
			var numberIncrement = setInterval(increment, rate);
			function clear() {
				clearInterval(numberIncrement);
			}
			setTimeout(clear, 3000);

		};
});