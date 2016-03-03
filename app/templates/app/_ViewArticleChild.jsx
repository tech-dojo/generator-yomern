import React from 'react';
import {
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class View<%=module_name%>Child extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;
    this.delete<%=module_name%> = this.delete<%=module_name%>.bind(this);
  }

  delete<%=module_name%>() {
    this.props.delete<%=module_name%>(this.props.<%=module_name%>Id);
  }

  render() {
    var <%=module_name%> = this.props.<%=module_name%>;
    return (
      <Grid className="marginBottom">
        <Row>
          <Col md={12} lg={12} sm={12} xs={12}>
            <h1>{<%=module_name%>.<%=fieldName%>}</h1>
            <hr></hr>
          </Col>
          <Col md={8} lg={8} sm={8} xs={8}>
            <h3>{<%=module_name%>.<%=fieldName2%>}</h3>
          </Col>
          <Col md={4} lg={4} sm={4} xs={4}>
            {this.props.loggedIn && <div className="pull-right">
              <LinkContainer className="editBtnCSS" to={`/<%=smallModuleName%>s/edit/${<%=module_name%>._id}`}>
                <Button bsStyle="primary">Edit</Button>
              </LinkContainer>
              <Button onClick={this.delete<%=module_name%>} bsStyle="danger">Delete</Button>
            </div>
}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default View<%=module_name%>Child;
