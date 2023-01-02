import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './dashboard.css';
import axios from 'axios';
import BookedCard from '../../components/bookedCard/BookedCard';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { username, email } = currentUser.details;
  const [bookings, setBookings] = useState([]);

  //	fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/v1/users/${currentUser.details._id}`);
      setBookings(res.data.bookedRooms);
    };
    fetchUser();
  }, [currentUser.details._id]);

  return (
    <>
      <Navbar />

      <div className='dashboardContainer'>
        <div className='dLeft'>
          <ul className='dUl'>
            <li className='dLi'>
              <Link>Booking History</Link>
            </li>
            <li className='dLi'>
              <Link>Personal Details</Link>
            </li>
            <li className='dLi'>
              <Link>Payment Method</Link>
            </li>
            <li className='dLi'>
              <Link>Security</Link>
            </li>
            <li className='dLi'>
              <Link>Settings</Link>
            </li>
          </ul>
        </div>
        <div className='dRight'>
          <h2>Booking History</h2>
          <br />
          <p>
            Hello, {username} / {email}. Check your booking and manage it.
          </p>
          <div className='line'></div>

          {bookings.map((b) => {
            return <BookedCard {...b} key={b._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
