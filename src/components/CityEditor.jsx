var React = require('react');
var jQuery = require ('jquery');
var CityName = require('./CityName.jsx');

require('./CityEditor.css');

var CityEditor = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            searchResult: [],
            disabledAdd: true
        };
    },

    handleNewCityName: function(event) {
        this.setState({ name: event.target.value });
        if (event.target.value.length > 2) {
            this.handleSearch(event.target.value);
        } else {
            this.setState({searchResult: []});
        }
        this.setState({ disabledAdd: true });        
    },

    handleSearch: function(value) {
        var cities=[];
        var url = this.props.apiUrl + 'find?q=' + value + '&type=like&mode=json&appid=' + this.props.apiKey;
        jQuery.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                data.list.map(function(city){
                    cities.push(city.name+', '+city.sys.country);
                });
                this.setState({searchResult: cities});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        }); 
    },

    handleCityAdd: function() {
            var newCity = {
                name: this.state.name,
                id: Date.now()
            }
            this.props.onCityAdd(newCity);
            this.setState({ name: '' });
            this.setState({ disabledAdd: true });
    },

    handleCitySelect: function(event) {
        this.setState({ name: event.target.innerText });
        this.setState({ searchResult: [] });
        this.setState({ disabledAdd: false });
    },

    render: function() {
        return (
            <div className="city-editor">
                <input type='text' className='search-city' value={this.state.name} onChange={this.handleNewCityName}/>
                <input type='submit' className='add' value="Add" onClick={this.handleCityAdd} disabled={this.state.disabledAdd}/>
                    <ul className="search-result" onClick={this.handleCitySelect}>
                        {
                            this.state.searchResult.map(function(cityName, index){
                                return (
                                    <CityName key={index} value={cityName}></CityName>
                                );
                            })
                        }
                    </ul>
            </div>
        );
    }
});

module.exports = CityEditor;