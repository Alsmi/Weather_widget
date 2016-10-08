var React = require('react');

require('./CityEditor.css');

var CityEditor = React.createClass({
    getInitialState: function() {
        return {
            name: ''
        };
    },

    handleNewCityName: function(event) {
        this.setState({ name: event.target.value });
    },

    handleCityAdd: function() {
        if (this.state.name !== '') {
            var newCity = {
                name: this.state.name,
                id: Date.now()
            }
            this.props.onCityAdd(newCity);
            this.setState({ name: '' });
        }
        else {
            alert('Please, enter the name of the city!');
        }
    },

    render: function() {
        return (
            <div className="city-editor">
                <input type='text' className='search-city' value={this.state.name} onChange={this.handleNewCityName}/>
                <input type='submit' className='add' value="Add" onClick={this.handleCityAdd}/>
            </div>
        );
    }
});

module.exports = CityEditor;