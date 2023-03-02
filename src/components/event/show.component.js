import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import dateFormat, { masks } from "dateformat";

export default function  ShowEvent() {

  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
    const [datetime, setDatetime] = useState("")

  useEffect(()=>{
    fetchEvent()
  },[])

  const fetchEvent = async () => {
    await axios.get(`http://localhost/event/public/api/events/${id}`).then(({data})=>{
      const { title, description, image, datetime } = data.event
      setTitle(title)
      setDescription(description)
      setImage(image)
        setDatetime(datetime)
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
              <h4 className="card-title">Show Event</h4>
              <hr />

                  <Row> 
                      <Col>
                          <h6 className="card-title">Title</h6>
                          <p className="card-text">{title}</p>
                      </Col>
                      <Col>
                        <Link className='btn btn-primary mb-2 float-end' to={"/"}>
                            Event List
                        </Link>
                      </Col>
                  </Row>
                <Row className="my-3">
                    <Col>
                        <h6 className="card-title">Date / Time</h6>
                        <p className="card-text">{dateFormat(datetime, "ddd, mmm dS, yyyy. h:MM TT")}</p>
                    </Col>
                </Row>
                  <Row className="my-3">
                      <Col>
                          <h6 className="card-title">Description</h6>
                          <p className="card-text">{description}</p>
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