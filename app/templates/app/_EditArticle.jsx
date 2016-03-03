import React from 'react';
import <%=module_name%>Store from './../../stores/<%=module_name%>Store.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import Form from './Form.jsx';

function get<%=module_name%>() {
  return { Edit<%=module_name%>: <%=module_name%>Store.get<%=module_name%>() };
}

class Edit<%=module_name%> extends React.Component {
    constructor(props) {
    super(props);
    this.state = {};
    this.history = props.history;
    <%=module_name%>Store.fetch<%=module_name%>(props.params.id);
    this.state = get<%=module_name%>();
    <%-handleInputBindedit%>
    this._formSubmit = this._formSubmit.bind(this);
  }

  <%-handleInput%>

  _formSubmit(value) {
    <%=module_name%>Store.edit<%=module_name%>(value, value._id, this.history);
  }

  render() {
    return (
      <Grid className="marginBottom">
        <Row>
          <Col md={12}>
            <h2>
              <b>Edit <%=module_name%></b>
            </h2>
            <hr></hr>
            <Form formSubmit={this._formSubmit}  <%=module_name%>={this.state.Edit<%=module_name%>}
              <%=inputHtml%> />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Edit<%=module_name%>;
