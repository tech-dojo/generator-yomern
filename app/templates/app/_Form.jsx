import React from 'react';
import {Grid, Row, Col, Button, Input, ButtonInput} from 'react-bootstrap';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    <%-handleInputBind%>
    this._formSubmit = this._formSubmit.bind(this);
  }

   <%-formhandleInput%>

  _formSubmit(e) {
    e.preventDefault();
    this.props.formSubmit(this.props.<%=module_name%>);
  }

  render() {
    var <%=module_name%> = this.props.<%=module_name%>;
    return (
        <Grid >
          <Row>
            <Col md={12}>
              <form onSubmit={this._formSubmit}>
                <%-formInputHtml%>
                <ButtonInput type="submit" value="Submit Button" bsStyle="primary"/>
              </form>
            </Col>
          </Row>
        </Grid>
      );
  }
  }

export default Form;
