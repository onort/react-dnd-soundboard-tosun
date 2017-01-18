import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Library from './components/library/Library';
import Queue from './components/queue/Queue';
import SiteHeader from './components/common/SiteHeader';
import SiteFooter from './components/common/SiteFooter';
import { persons } from './audio';

import { Grid, Row, Col } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      persons
    };
    this.siteTitle = 'Tosun Paşa Soundboard';
  }

  render() {
    const { items, persons } = this.state;
    return (
      <div>
        <SiteHeader title={this.siteTitle} />
        <Grid>
          <Row>
            <Col xs={6} sm={5} md={4} smOffset={1} >
              <Queue name="Queue" items={items} persons={persons} />
            </Col>
            <Col xs={6} sm={5} md={4} smOffset={1} >
              <Library name="Library" persons={persons} />
            </Col>
          </Row>
        </Grid>
        <SiteFooter />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
