var React = require ('react');

require ('./reset.css');
require ('./City.css');

var City = React.createClass({
    render: function(){
        return  (
                    <li className='city'>
                        {this.props.name}
                        <span className="delete-city" onClick={this.props.onDelete}>×</span>
                    </li>
                );                
    }
});

module.exports = City;