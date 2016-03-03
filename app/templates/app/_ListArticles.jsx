import React from 'react';
import <%=module_name%>Store from './../../stores/<%=module_name%>Store.jsx';
import List<%=module_name%>sChild from './List<%=module_name%>sChild.jsx';

function get<%=module_name%>List() {
  return { <%=module_name%>s: <%=module_name%>Store.get<%=module_name%>List() };
}

class <%=module_name%>List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;
    <%=module_name%>Store.fetch<%=module_name%>List();
    this.state = {};
    this.state.<%=module_name%>s = [];
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    <%=module_name%>Store.onChange(this._onChange);
  }

  componentWillUnmount() {
    <%=module_name%>Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(get<%=module_name%>List());
  }

  render() {
    return (
    <List<%=module_name%>sChild <%=module_name%>s= {this.state.<%=module_name%>s} />
  );
  }
  }
export default <%=module_name%>List;
