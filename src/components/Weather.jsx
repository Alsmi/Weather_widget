var React = require ('react');

require ('./reset.css');
require ('./Weather.css');

var Weather = React.createClass({

	// getData: function(prop) {
	// 	if (this.props.data) {
	// 		var weatherData = JSON.parse(this.props.data)
	// 		switch (prop) {
	// 			case 'name': return weatherData.name;
	// 			case 'country': return weatherData.sys.country;
	// 			case 'temp': return weatherData.main.temp;
	// 			case 'sky': return weatherData.weather[0].description;
	// 			case 'time':
	// 				var d = new Date(weatherData.dt*1000); 
	// 				var day = d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
	// 				var time = d.getHours()+':'+d.getMinutes();
	// 				return day+' '+time;
	// 			case 'wind': return weatherData.wind.speed;
	// 			case 'clouds': return weatherData.weather[0].main;
	// 			case 'pressure': return weatherData.main.pressure;
	// 			case 'humidity': return weatherData.main.humidity;
	// 			case 'sunrise':
	// 				var sunrise = new Date(weatherData.sys.sunrise*1000);
	// 				return sunrise.getHours()+':'+sunrise.getMinutes();
	// 			case 'sunset':
	// 				var sunset = new Date(weatherData.sys.sunset*1000);
	// 				return sunset.getHours()+':'+sunset.getMinutes();
	// 			case 'coords-lat': return weatherData.coord.lat;
	// 			case 'coords-lon': return weatherData.coord.lon;
	// 		}
	// 	}		
	// },

    render: function(){


    	if (this.props.data) {
    		var weatherData = JSON.parse(this.props.data)
    		var d = new Date(weatherData.dt*1000); 
			var day = d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
			var time = d.getHours()+':'+d.getMinutes();
			var sunrise = new Date(weatherData.sys.sunrise*1000);
			var sunset = new Date(weatherData.sys.sunset*1000);

	        return  (
		        		<div className='field weather-widget'>

							<h2 className='weather-widget-city-name'>Weather in {weatherData.name+', '+weatherData.sys.country}</h2>
	                    	<h3 className='weather-widget-temperature'>{weatherData.main.temp} °C</h3>
	                    	<p className='weather-widget-main'>{weatherData.weather[0].description}</p>
	                    	<p className='weather-widget-date'>get at {day+' '+time}</p>
	                    	<table className='weather-widget-items'>
	                    		<tbody>
	                    			<tr>
			                            <td>Wind</td>
			                            <td id="weather-widget-wind">{weatherData.wind.speed} m/s</td>
			                        </tr>
			                        <tr>
			                            <td>Cloudiness</td>
			                            <td id="weather-widget-cloudiness">{weatherData.weather[0].main}</td>
			                        </tr>
			                        <tr>
			                            <td>Pressure</td>
			                            <td id="weather-widget-pressure">{weatherData.main.pressure} hpa</td>
			                        </tr>
			                        <tr>
			                            <td>Humidity</td>
			                            <td id="weather-widget-humidity">{weatherData.main.humidity}%</td>
			                        </tr>
			                        
			                        <tr>
			                            <td>Sunrise</td>
			                            <td id="weather-widget-sunrise">{sunrise.getHours()+':'+sunrise.getMinutes()} </td>
			                        </tr>
			                        <tr>
			                            <td>Sunset</td>
			                            <td id="weather-widget-sunset">{sunset.getHours()+':'+sunset.getMinutes()} </td>
			                        </tr>
			                        <tr>
			                            <td>Geo coords</td>
			                            <td id="weather-widget-geo-coords">[ {weatherData.coord.lat} , {weatherData.coord.lon}]</td>
			                        </tr>
			                    </tbody>
	                    	</table>
	                    </div>
	                    
	                );
	    } else {
	    	return  (
	                    <div className='field weather-widget'>
	                    	{"Please wait..."}
	                    </div>
	                );
	    }              
    }

});

module.exports = Weather;

					