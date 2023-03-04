import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import dateFormat, { masks } from "dateformat"

export default function List() {

    const [booking, setBooking] = useState([])

    useEffect(()=>{
        fetchBooking()
    },[])

    const fetchBooking = async () => {
        await axios.get(`http://localhost/event/public/api/booking`).then(({data})=>{
            setBooking(data)
        })
    }

    const deleteBooking = async (id) => {
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

          await axios.delete(`http://localhost:8000/api/booking/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchBooking()
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
                <Link className='btn btn-primary mb-2 float-end' to={"/booking/create"}>
                    Create Booking
                </Link>
                <h2>Bookings</h2>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Event</th>
                                    <th>Booked on</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    booking.length > 0 && (
                                        booking.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.customer_id}</td>
                                                <td>{row.event['title']}</td>
                                                <td>{dateFormat(row.booked_at, "ddd, mmm dS, yyyy  h:MM TT")}</td>
                                                <td>
                                                    <Link to={`/booking/show/${row.id}`} className='btn btn-primary'>
                                                        Show
                                                    </Link>
                                                    <Link to={`/booking/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteBooking(row.id)}>
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