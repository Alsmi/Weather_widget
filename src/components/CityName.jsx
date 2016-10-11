var React = require ('react');

require ('./reset.css');
require ('./CityName.css');

var CityName = React.createClass({

    render: function(){
        return  (
                    <li className='city-select'>
                        <span>{this.props.value}</span>
                    </li>
                );                
    }
});

module.exports = CityName;