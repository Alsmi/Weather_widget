var React = require ('react');

require ('./reset.css');
require ('./City.css');

var City = React.createClass({
    render: function(){
        return  (
                    <li className={this.props.isActive}>
                        <span className="city-name" onClick={this.props.setActive}>{this.props.name}</span>
                        <span className="delete-city" onClick={this.props.onDelete}>×</span>
                    </li>
                );                
    }
});

module.exports = City;