import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import dateFormat, { masks } from "dateformat";
export default function List() {

    const [events, setEvents] = useState([])

    useEffect(()=>{
        fetchEvents()
    },[])

    const fetchEvents = async () => {
        await axios.get(`http://localhost/event/public/api/event`).then(({data})=>{
            setEvents(data)
        })
    }

    const deleteEvent = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/events/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchEvents()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/event/create"}>
                    Create Event
                </Link>
                <h2>Events</h2>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Venue</th>
                                    <th>Date Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    events.length > 0 && (
                                        events.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>{row.venue['name']}</td>
                                                <td>{dateFormat(row.datetime, "ddd, mmm dS yyyy h:MM TT")}</td>
                                                    {/*<td>*/}
                                                    {/*    <img width="50px" alt='' src={`http://localhost/event/public/storage/product/image/${row.image}`} />*/}
                                                    {/*</td>*/}
                                                <td>
                                                    <Link to={`/event/show/${row.id}`} className='btn btn-primary'>
                                                        Show
                                                    </Link>
                                                    <Link to={`/event/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteEvent(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}