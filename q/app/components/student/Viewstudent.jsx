import React from 'react';
import studentStore from './../../stores/student.jsx';
import {Grid, Row, Col} from 'react-bootstrap'

class Viewstudent extends React.Component {
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
              <b>View student</b>
            </h2>
            <hr></hr>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Viewstudent;
