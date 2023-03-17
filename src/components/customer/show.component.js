import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditCustomer() {
    const navigate = useNavigate();
    const { id } = useParams()

    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [towncity, setTowncity] = useState("")
    const [county, setCounty] = useState("")
    const [postcode, setPostcode] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const [validationError,setValidationError] = useState({})


    useEffect(()=>{
        fetchCustomer()
    },[])

    const fetchCustomer = async () => {
        await axios.get(`http://localhost/event/public/api/customer/${id}`).then(({data})=>{
            const { username, title, firstname, lastname, address1, address2, towncity, county, postcode, phone, email } = data.customer
            setUsername(username)
            setTitle(title)
            setFirstname(firstname)
            setLastname(lastname)
            setAddress1(address1)
            setAddress2(address2)
            setTowncity(towncity)
            setCounty(county)
            setPostcode(postcode)
            setPhone(phone)
            setEmail(email)
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    const updateCustomer = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');

        formData.append('username', username)
        formData.append('title', title)
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('address1', address1)
        formData.append('address2', address2)
        formData.append('towncity', towncity)
        formData.append('county', county)
        formData.append('postcode', postcode)
        formData.append('phone', phone)
        formData.append('email', email)


        await axios.post(`http://localhost/event/public/api/customer/${id}`, formData).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate("/customer/list")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }

    return (
        <div className="container">
        <div>
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/customer/list"}>
                    Customer list
                </Link>
                <h2>Customer Details</h2>
            </div>
            <div className="form-wrapper">
                {
                    Object.keys(validationError).length > 0 && (
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-danger">
                                    <ul className="mb-0">
                                        {
                                            Object.entries(validationError).map(([key, value])=>(
                                                <li key={key}>{value}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
                <Form onSubmit={updateCustomer}>
                    <Row>
                        <Col>
                            <Form.Group controlId="Username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={username} onChange={(event )=>{
                                    setUsername(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(event )=>{
                                    setTitle(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={firstname} onChange={(event )=>{
                                    setFirstname(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastname} onChange={(event )=>{
                                    setLastname(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Address1">
                                <Form.Label>Address 1</Form.Label>
                                <Form.Control type="text" value={address1} onChange={(event )=>{
                                    setAddress1(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Address2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control type="text" value={address2} onChange={(event )=>{
                                    setAddress2(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Towncity">
                                <Form.Label>Town / City</Form.Label>
                                <Form.Control type="text" value={towncity} onChange={(event )=>{
                                    setTowncity(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="County">
                                <Form.Label>County</Form.Label>
                                <Form.Control type="text" value={county} onChange={(event )=>{
                                    setCounty(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Postcode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control type="text" value={postcode} onChange={(event )=>{
                                    setPostcode(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" value={phone} onChange={(event )=>{
                                    setPhone(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={email} onChange={(event )=>{
                                    setEmail(event.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        </div>
    )}
