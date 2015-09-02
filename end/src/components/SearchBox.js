var SearchBox = React.createClass({
    getInitialState: function(){
        return {};
    },

    handleChange: function(e){
        this.props.onUserInput(e.target.value);
    },

    render: function(){
        return (
            <div className="pull-right" style={{marginBotton: '10em'}}>
                <span>Search: </span>
                <input type="text" onChange={this.handleChange} ref="filterTextInput" className="form-control" placeholder={this.props.placeholder} />
            </div>);
    }
});
