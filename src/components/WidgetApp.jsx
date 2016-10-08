var React = require ('react');
var CityEditor = require('./CityEditor.jsx');
var CitiesList = require('./CitiesList.jsx');

require ('./reset.css');
require ('./WidgetApp.css');

var CITIES = [
                {
                    id: 1,
                    name: 'Kharkiv'
                },
                {
                    id: 2,
                    name: 'Kyiv'
                }
            ];

var WidgetApp = React.createClass({

    getInitialState: function() {
        return {
            cities: CITIES
        };
    },

    componentDidMount: function() {
        var localCities = JSON.parse(localStorage.getItem('cities'));
        if (localCities) {
            this.setState({ cities: localCities });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleCityDelete: function(city) {
        var cityId = city.id;
        var newCities = this.state.cities.filter(function(city) {
            return city.id !== cityId;
        });
        this.setState({ cities: newCities });
    },

    handleCityAdd: function(newCity) {
        var newCities = this.state.cities.slice();
        newCities.push(newCity);
        this.setState({ cities: newCities });
    },

    render: function() {
        return (
            <div className='widget'>
                <CityEditor onCityAdd={this.handleCityAdd} />
                <CitiesList cities={this.state.cities} onCityDelete={this.handleCityDelete} />
                <div className='field'></div>
            </div>
        );
    },

    _updateLocalStorage: function() {
        var cities = JSON.stringify(this.state.cities);
        localStorage.setItem('cities', cities);
    }
});

module.exports = WidgetApp;