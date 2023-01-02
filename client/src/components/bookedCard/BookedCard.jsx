import axios from 'axios';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import './bookedCard.css';

const BookedCard = ({ dates, room, paid, createdAt }) => {
  const [hotel, setHotel] = useState({});
  const formatDates = dates.map((d) => {
    let myDate = new Date(Number(d));
    return myDate.toDateString();
  });

  //	fetch rooms data
  const { data } = useFetch(`/api/v1/rooms/${room}`);

  //	fetch single Hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      const res = await axios.get(`/api/v1/hotels/find/${data.hotelId}`);
      setHotel(res.data);
    };

    fetchHotel();
  }, [data]);

  return (
    <div className='bookedCardContainer'>
      <div className='bTitle'>Booking ID: {data._id}</div>
      <p>You reserved this room on: {createdAt}</p>
      <div className='bInfoContainer'>
        <div className='bInfoLeft'>
          <p>Booked room:</p>
          <ul>
            <li>Hotel: {hotel.name}</li>
            <li>Address: {hotel.address}</li>
            <li>Room type: {data.title}</li>
            <li>Description: {data.desc}</li>
            <li>
              Payment made:
              <b>
                €
                {paid.reduce((acc, curr) => Number(acc) + Number(curr)) *
                  dates.length}
              </b>
            </li>
          </ul>
        </div>

        <div className='bInfoRight'>
          <p>Booked date:</p>
          <ul>
            {formatDates.map((d) => {
              return <li key={d}>{d}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookedCard;
