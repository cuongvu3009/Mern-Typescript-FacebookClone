import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './reserve.css';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/api/v1/hotels/room/${hotelId}`);
  const { date } = useSelector((state) => state.search);
  const [payment, setPayment] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  //	get dates ranges, which return an array of dates choosen
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(date[0].startDate, date[0].endDate);

  //	check if dates about to book available or not, if someone else already booked, it will return false
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  //	making an arr of selected rooms
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value.split(' ');

    setSelectedRooms(
      checked
        ? [...selectedRooms, value[0]]
        : selectedRooms.filter((item) => item !== value[0])
    );

    setPayment(
      checked
        ? [...payment, value[1]]
        : payment?.filter((item) => item !== value[1])
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/api/v1/rooms/availability/${roomId}`, {
            room: roomId,
            dates: alldates,
            paid: payment.map((p) => p),
          });

          return res.data;
        })
      );

      setOpen(false);
      navigate('/dashboard');
    } catch (err) {
      setErrMsg(err.message);
      console.log(err);
    }
  };

  return (
    <div className='reserve'>
      {errMsg && <p>{errMsg}</p>}
      <div className='rContainer'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='rClose'
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((item) => {
          return (
            <div className='rItem' key={item._id}>
              <div className='rItemInfo'>
                <div className='rTitle'>{item.title}</div>
                <div className='rDesc'>{item.desc}</div>
                <div className='rMax'>
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className='rPrice'>€{item.price} / night</div>
                <div className=''>
                  Number of nights to stay: <b>{alldates.length}</b>
                </div>
                <div className='rPrice'>
                  Total price: <b>€{item.price * alldates.length}</b>
                </div>
                <p>
                  <input
                    type='checkbox'
                    value={`${item._id} ${item.price}`}
                    onChange={handleSelect}
                    disabled={!isAvailable(item)}
                  />{' '}
                  Select this room
                </p>
              </div>
            </div>
          );
        })}
        <button onClick={handleClick} className='rButton'>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
