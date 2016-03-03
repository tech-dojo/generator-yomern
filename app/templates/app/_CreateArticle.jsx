import React from 'react';
import <%=module_name%>Store from './../../stores/<%=module_name%>Store.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import Form from './Form.jsx';

class Create<%=module_name%> extends React.Component {
 constructor(props) {
   super(props);
   this.history = props.history;
   this.state = {};
   this.state.<%=module_name%> = {};
   this.state.error = '';
   <%-handleInputBind%>
   this._formSubmit = this._formSubmit.bind(this);
 }

<%-handleInput%>
_formSubmit(value) {
   <%=module_name%>Store.add<%=module_name%>(value, this.history);
 }

 render() {

   return (
     <Grid className="marginBottom">
        <Row>
          <Col md={12}>
            <h2>
              <b>Create <%=module_name%></b>
            </h2>
            <hr></hr>
            <Form formSubmit={this._formSubmit} <%=module_name%>={this.state.<%=module_name%>}
              <%=inputHtml%>  />
          </Col>
        </Row>
      </Grid>
   )
 }
}

export default Create<%=module_name%>;
