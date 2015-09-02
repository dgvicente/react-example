var Cell = React.createClass({

  render: function () {
      if (this.props.type == 'header')
        return (<th>{this.props.value}</th>);
    return (
        <td>{this.props.value}{this.props.children}</td>
      );
  }
});
