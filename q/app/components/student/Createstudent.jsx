import React from 'react';
import studentStore from './../../stores/student.jsx';
import {Grid, Row, Col} from 'react-bootstrap'

class Createstudent extends React.Component {
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
              <b>Create student</b>
            </h2>
            <hr></hr>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Createstudent;
