var Cell = React.createClass({

  render: function () {
      if (this.props.type == 'header')
        return (<th>{this.props.value}</th>);
    return (
        <td>{this.props.value}{this.props.children}</td>
      );
  }
});

var Row = React.createClass({

  render: function () {
    return (
        <tr>
          {this.props.children}
        </tr>
      );
  }
});

var DeleteButton = React.createClass({
    clickListener: function(){
        this.props.clickListener(this.props.customerData);
    },

    render: function(){
        return (
            <button data-toggle="tooltip" title="Delete" onClick={this.clickListener}>
                <i className="glyphicon glyphicon-remove"></i>
            </button>
        );
    }
});



var CustomersTable = React.createClass({
    getInitialState: function(){
        var data = [];
        return {
            data: data,
            filteredData: data
        };
      },

      loadInitialData: function(){
          $.ajax({
              url: this.props.url,
              dataType: 'json',
              success: function(data) {
                  this.setState({
                      data: data["customers"]
                  });
              }.bind(this),
              error: function(xhr, status, err) {
                  console.error(this.props.url, status, err.toString());
              }.bind(this)
          });
      },

      componentDidMount: function() {
          this.loadInitialData();
      },

      handleClick: function(customerData){
          var index = this.state.data.indexOf(customerData);
          this.state.data.splice(index, 1);
          this.setState({data: this.state.data});
      },

      getItems: function(){
          rows = [];
          i = -1;
          this.state.data.map(function(row){
              var filterText = this.props.filterText.toUpperCase();
              const regexp = new RegExp(filterText);
              if (filterText)
                  if (!regexp.test(row["name"].toUpperCase()) && !regexp.test(row["city"].toUpperCase()))
                    return;
              rows.push(
                <tr>
                    <td>{row["name"]}</td>
                    <td>{row["city"]}</td>
                    <td>{row["joined"]}</td>
                    <td>
                        <DeleteButton customerData={row} clickListener={this.handleClick}/>
                    </td>
                </tr>);
          }.bind(this));
          return rows;
    },

    render: function(){
        return (
            <table className="table table-hover table-striped">
                <thead>
                    <Row>
                        <Cell type="header" value="Name"></Cell>
                        <Cell type="header" value="City"></Cell>
                        <Cell type="header" value="Joined"></Cell>
                        <Cell type="header" value="Action"></Cell>
                    </Row>
                </thead>
                <tbody>
                    {this.getItems()}
                </tbody>
            </table>);
    }
});

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


var SearchTable = React.createClass({
    getInitialState: function(){
        return {filterText: ''};
    },

    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },

    render: function(){
        return (
            <div>
                <SearchBox onUserInput={this.handleUserInput}/>
                <CustomersTable url={this.props.url} filterText={this.state.filterText}/>
            </div>
        );
    }
});

React.render(
  <SearchTable url="/src/data/customers0.json"/>,
  document.getElementById("table-container")
);
