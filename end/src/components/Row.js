var Row = React.createClass({

  render: function () {
    return (
        <tr>
          {this.props.children}
        </tr>
      );
  }
});
