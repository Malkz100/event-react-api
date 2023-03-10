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

import EditBooking from "./components/booking/edit.component";
import BookingList from "./components/booking/list.component";
import CreateBooking from "./components/booking/create.component";
import ShowBooking from "./components/booking/show.component";

import EditCustomer from "./components/customer/edit.component";
import CustomerList from "./components/customer/list.component";
import CreateCustomer from "./components/customer/create.component";
import ShowCustomer from "./components/customer/show.component";

function App() {
  return (<Router>
    <Navbar bg="success">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Event API
        </Link>
        <Link to={"/event/list"} className="navbar-brand text-white">
          Events
        </Link>
        <Link to={"/booking/list"} className="navbar-brand text-white">
          Bookings
        </Link>
        <Link to={"/customer/list"} className="navbar-brand text-white">
          Customers
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
            <Route exact path='/event/list' element={<EventList />} />
          </Routes>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/booking/create" element={<CreateBooking />} />
            <Route path="/booking/edit/:id" element={<EditBooking />} />
            <Route path="/booking/show/:id" element={<ShowBooking />} />
            <Route exact path='/booking/list' element={<BookingList />} />
          </Routes>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/customer/create" element={<CreateCustomer />} />
            <Route path="/customer/edit/:id" element={<EditCustomer />} />
            <Route path="/customer/show/:id" element={<ShowCustomer />} />
            <Route exact path='/customer/list' element={<CustomerList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;