var React = require('react');
var City = require('./City.jsx');

require('./CitiesList.css');

var CitiesList = React.createClass({
    render: function() {
        var onCityDelete = this.props.onCityDelete;

        return (
            <ul className="cities-list">
                {
                    this.props.cities.map(function(city){
                        return (
                            <City key={city.id} onDelete={onCityDelete.bind(null, city)} name={city.name}></City>
                        );
                    })
                }
            </ul>
        );
    }
});

module.exports = CitiesList;