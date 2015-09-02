var DeleteButton = React.createClass({
    clickListener: function(){
        console.log(this.props);
        this.props.clickListener(this.props.customerObj);
    },

    render: function(){
        return (
            <button data-toggle="tooltip" title="Delete" onClick={this.clickListener}>
                <i className="glyphicon glyphicon-remove"></i>
            </button>
        );
    }

});
