var React = require ('react');
var jQuery = require ('jquery');
var CityEditor = require('./CityEditor.jsx');
var Weather = require('./Weather.jsx');
var CitiesList = require('./CitiesList.jsx');

require ('./WidgetApp.css');

var APIURL = 'http://api.openweathermap.org/data/2.5/';
var APIKEY = '3cf1e48658af7c84b3033ba1cfc2fb92';
var CITIES = [
                {
                    id: 1,
                    name: 'Kharkiv, UA'
                },
                {
                    id: 2,
                    name: 'Kyiv, UA'
                }
            ];

var WidgetApp = React.createClass({

    getInitialState: function() {
        return {
            cities: CITIES,
            weather: this.getWeatherData(CITIES[0]),                             
            selected: 1
        };
    },

    componentDidMount: function() {
        var localCities = JSON.parse(localStorage.getItem('cities'));
        if (localCities) {
            this.setState({ cities: localCities, selected: localCities[0].id, weather: this.state.weather });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    getWeatherData: function(city) {
        console.log(CityEditor.onCityAdd);
        var url = APIURL + 'weather?q=' + city.name + '&units=metric&appid=' + APIKEY;
        jQuery.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({weather: JSON.stringify(data)});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });                                                              
    },

    handleCityDelete: function(city) {
        var cityId = city.id;
        var prevIndex;

        var newCities = this.state.cities.filter(function(city, index) {
            if (city.id === cityId) {
                if (index > 0) {
                    prevIndex = index - 1;
                }
            }
            return city.id !== cityId;
        });

        this.setState({ cities: newCities});
        if (this.state.selected == cityId) {
            this.handleSetCityActive(newCities[prevIndex]);
            this.setState({ weather: this.getWeatherData(newCities[prevIndex]) });
        }
    },

    handleNewCityAdd: function(newCity) {
        var newCities = this.state.cities.slice();
        newCities.push(newCity);
        this.setState({ cities: newCities });
        this.handleSetCityActive(newCity);
        this.setState({ weather: this.getWeatherData(newCity) });
    },

    handleIsCityActive: function(id){
        return 'city '+((id===this.state.selected) ?'active':'');
    },

    handleSetCityActive: function(city){
        this.setState({ selected: city.id });
        this.setState({ weather: this.getWeatherData(city) });
    },

    render: function() {
        return (
            <div className='widget'>
                <CityEditor onCityAdd={this.handleNewCityAdd} apiUrl={APIURL} apiKey={APIKEY} />
                <CitiesList cities={this.state.cities} setCityActive={this.handleSetCityActive} isCityActive={this.handleIsCityActive} onCityDelete={this.handleCityDelete} />
                <Weather data={this.state.weather} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var cities = JSON.stringify(this.state.cities);
        localStorage.setItem('cities', cities);
    }
});

module.exports = WidgetApp;