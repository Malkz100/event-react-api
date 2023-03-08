import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import dateFormat, { masks } from "dateformat";

export default function  ShowBooking() {

  const { id } = useParams()

  const [title, setTitle] = useState("")
    // const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [datetime, setDatetime] = useState("")
    const [event, setEvent] = useState("")
    const [venue, setVenue] = useState("")
    const [name, setName] = useState("")
    const [booked_at, setBooked_at] = useState("")
    const [customer, setCustomer] = useState([])
    const [cost, setCost] = useState([])

  useEffect(()=>{
    fetchBooking()
  },[])

  const fetchBooking = async () => {
    await axios.get(`http://localhost/event/public/api/booking/${id}`).then(({data})=>{
        const { title, image, datetime, event, venue, booked_at, customer } = data.booking
        setTitle(title)
     // setDescription(description)
        setImage(image)
        setDatetime(datetime)
        setEvent(event)
        setVenue(venue)
        setBooked_at(booked_at)
        // setVenuename(venuename)
        setCustomer(customer)
        setCost(cost)

         const {name} = data.venue
         setName(name)

        // const {cost} = data.cost
        // setCost(cost)

    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <Row className="card">
            <div className="card-body">
                  <div>
                      <Link className='btn btn-primary mb-2 float-end' to={"/booking/list"}>
                          Booking List
                      </Link>
                      <h2 className="card-title">{event['title'] }</h2>
                  </div>
                  <hr />
                      <Row className="my-3">
                          <Col>
                            <h5 className="card-title">Customer:</h5>
                            <p className="card-text" >{customer.username}</p>
                          </Col>
                      </Row>

                      {/*<div className='float-end'>*/}
                      {/*    <h5 className="card-title">Time</h5>*/}
                      {/*    <p className="card-text">{dateFormat(datetime, "h:MM TT")}</p>*/}
                      {/*</div>*/}
                <Row classname="my-3">
                    <Col>
                          <h5 className="card-title">Booked on:</h5>
                          <p className="card-text" >{dateFormat(booked_at, "ddd, mmm dS, yyyy. h:MM TT")}</p>
                    </Col>
                  </Row>

                <Row className="my-3">
                    <Col>
                        <h5 className="card-title">Event</h5>
                        <p className="card-text">{event['title']} - {dateFormat(event['datetime'], "ddd, mmm dS, yyyy. h:MM TT")}</p>
                    </Col>
                </Row>
                  <Row className="my-3">
                      <Col>
                          <h5 className="card-title">Description</h5>
                          <p className="card-text">{event['description']}</p>
                      </Col>
                  </Row>
                <Row className="my-3">
                    <Col>
                        <h5 className="card-title">Venue</h5>
                        <p className="card-text">{name}</p>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <h5 className="card-title">Price</h5>
                        <p className="card-text">£{event['price']}</p>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <h5 className="card-title">Reduced Price</h5>
                        <p className="card-text">£{event['reduced_price']}</p>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <h5 className="card-title">Total Price</h5>
                        <p className="card-text">£{cost}</p>
                    </Col>
                </Row>
              <div>
                <img className="card-img-top" width="150px" alt='' src={`http://localhost/event/public/storage/images/venues/${image}`}/>
              </div>

            </div>
          </Row>
          </div>

        </div>
      </div>
  )
}