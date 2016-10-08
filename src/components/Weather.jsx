var React = require ('react');

require ('./reset.css');
require ('./Weather.css');

var Weather = React.createClass({
    render: function(){
        return  (
                    <div className='field'>{this.props.data} weather condition...</div>
                );                
    }
});

module.exports = Weather;