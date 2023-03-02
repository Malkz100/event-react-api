import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
//import "./App.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditEvent from "./components/event/edit.component";
import EventList from "./components/event/list.component";
import CreateEvent from "./components/event/create.component";
import ShowEvent from "./components/event/show.component";

function App() {
  return (<Router>
    <Navbar bg="success">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Event API
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/event/create" element={<CreateEvent />} />
            <Route path="/event/edit/:id" element={<EditEvent />} />
            <Route path="/event/show/:id" element={<ShowEvent />} />
            <Route exact path='/' element={<EventList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;