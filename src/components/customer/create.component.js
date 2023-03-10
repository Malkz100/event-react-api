import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateCustomer() {
    const [formData, setFormData] = useState({
        username: "",
        title: "",
        firstname: "",
        lastname: "",
        address1: "",
        address2: "",
        towncity: "",
        county: "",
        postcode: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost/event/public/api/customer`, formData)
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "Form submitted successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to submit form!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address Line 1"
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address Line 2"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Town/City"
                            name="towncity"
                            value={formData.towncity}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="County"
                            name="county"
                            value={formData.county}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Postcode"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )}
