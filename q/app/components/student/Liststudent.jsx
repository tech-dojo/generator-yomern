import React from 'react';
import studentStore from './../../stores/student.jsx';
import {Grid, Row, Col} from 'react-bootstrap'

class Liststudent extends React.Component {
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
              <b>List student</b>
            </h2>
            <hr></hr>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Liststudent;
