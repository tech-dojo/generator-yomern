import React from 'react';
import {Link} from 'react-router';
import {
  Grid,
  Row,
  Col,
  Panel,
  Pagination,
  Button,
  Well,
  Label
} from 'react-bootstrap';

class List<%=module_name%>sChild extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;
  }

  render() {
    var <%=module_name%>s = this.props.<%=module_name%>s.map((<%=module_name%>) => {
      return (
        <Link
          key={<%=module_name%>._id}
          to={`/<%=smallModuleName%>s/${<%=module_name%>._id}`}>
          <Col md={12} lg={12} sm={12} xs={12} className="products">
            <Panel header={<%=module_name%>.<%=fieldName%>}>
              {<%=module_name%>.<%=fieldName2%>}

            </Panel>
          </Col>
        </Link>
    );});
    return (
      <div className="marginBottom">
        <Grid>
            <Row className="productList">
              <h1><%=module_name%>s</h1>
              <hr></hr>
              {<%=module_name%>s}
              </Row>
            </Grid>
      </div>
    );
  }
}
export default List<%=module_name%>sChild;
