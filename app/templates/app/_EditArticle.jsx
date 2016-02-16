import React from 'react';
import <%=module_name%>Store from './../../stores/<%=module_name%>.jsx';
import {Grid, Row, Col} from 'react-bootstrap'

class Edit<%=module_name %> extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.state = {};
    }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h2>
              <b>Edit <%=module_name%></b>
            </h2>
            <hr></hr>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Edit<%=module_name%>;
