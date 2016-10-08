var React = require('react');
var City = require('./City.jsx');

require('./CitiesList.css');

var CitiesList = React.createClass({

    render: function() {
        var onCityDelete = this.props.onCityDelete;
        var isCityActive = this.props.isCityActive;
        var setCityActive = this.props.setCityActive;

        return (
            <ul className="cities-list">
                {
                    this.props.cities.map(function(city){
                        return (
                            <City key={city.id} setActive={setCityActive.bind(null, city)} isActive={isCityActive(city.id)} onDelete={onCityDelete.bind(null, city)} name={city.name}></City>
                        );
                    })
                }
            </ul>
        );
    }
});

module.exports = CitiesList;