

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

      handleClick: function(row){
          var index = this.state.data.indexOf(row);
          this.state.data.splice(index, 1);
          this.setState({data: this.state.data});
      },

      getItems: function(){
          rows = [];
          i = -1;
          this.state.data.forEach(function(row){
              var filterText = this.props.filterText.toUpperCase();
              const regexp = new RegExp(filterText);
              if (filterText)
                  if (!regexp.test(row["name"].toUpperCase()) && !regexp.test(row["city"].toUpperCase()))
                    return;
              rows.push(
                <Row>
                    <Cell value={row["name"]}/>
                    <Cell value={row["city"]}/>
                    <Cell value={row["joined"]}/>
                    <Cell>
                        <DeleteButton customerObj={row} clickListener={this.handleClick}/>
                    </Cell>
                </Row>);
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
