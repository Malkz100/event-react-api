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

  useEffect(()=>{
    fetchBooking()
  },[])

  const fetchBooking = async () => {
    await axios.get(`http://localhost/event/public/api/booking/${id}`).then(({data})=>{
        const { title, image, datetime, event, venue } = data.booking
        setTitle(title)
     // setDescription(description)
        setImage(image)
        setDatetime(datetime)
        setEvent(event)
        setVenue(venue)
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
          <div className="card">
            <div className="card-body">
                  <div>
                      <Link className='btn btn-primary mb-2 float-end' to={"/booking/list"}>
                          Booking List
                      </Link>
                      <h2 className="card-title">{title}</h2>
                  </div>
                  <hr />
                  <div>
                      {/*<div className='float-end'>*/}
                      {/*    <h5 className="card-title">Time</h5>*/}
                      {/*    <p className="card-text">{dateFormat(datetime, "h:MM TT")}</p>*/}
                      {/*</div>*/}
                      <div>
                          <h5 className="card-title">Booked on:</h5>
                          <p className="card-text" >{dateFormat(datetime, "ddd, mmm dS, yyyy. h:MM TT")}</p>
                      </div>
                  </div>
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
                        <p className="card-text">{event['venue_id']}</p>
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
              <div>
                <img className="card-img-top" width="150px" alt='' src={`http://localhost/event/public/storage/images/venues/${image}`}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}