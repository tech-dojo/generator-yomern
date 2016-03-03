import React from 'react';
import <%=module_name%>Store from './../../stores/<%=module_name%>Store.jsx';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import auth from './../../services/Authentication';
import View<%=module_name%>Child from './View<%=module_name%>Child.jsx';

function get<%=module_name%>() {
  return { <%=module_name%>: <%=module_name%>Store.get<%=module_name%>() };
}

class View<%=module_name%> extends React.Component {
  constructor(props, context) {
    super(props, context);
    <%=module_name%>Store.fetch<%=module_name%>(props.params.id);
    this.state = {};
    this.state.<%=module_name%> = {};
    this.state.loggedIn = auth.loggedIn();
    this._onChange = this._onChange.bind(this);
    this.delete<%=module_name%> = this.delete<%=module_name%>.bind(this);
  }

  componentWillMount() {
    <%=module_name%>Store.onChange(this._onChange);
  }

  componentWillUnmount() {
    <%=module_name%>Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(get<%=module_name%>());
  }

  delete<%=module_name%>(<%=module_name%>Id) {
    <%=module_name%>Store.delete<%=module_name%>(<%=module_name%>Id, this.props.history);
  }

  render() {
    return (
    <View<%=module_name%>Child loggedIn={this.state.loggedIn} <%=module_name%>Id= {this.props.params.id}
       <%=module_name%> = {this.state.<%=module_name%>} delete<%=module_name%> = {this.delete<%=module_name%>} />
    );
  }
}

export default View<%=module_name%>;
