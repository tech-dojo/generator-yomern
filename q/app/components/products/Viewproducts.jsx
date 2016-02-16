import React from 'react';
import productsStore from './../../stores/products.jsx';
import {Grid, Row, Col} from 'react-bootstrap'

class Viewproducts extends React.Component {
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
              <b>View products</b>
            </h2>
            <hr></hr>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Viewproducts;
