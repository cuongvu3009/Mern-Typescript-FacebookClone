import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  //	logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo'>
          <Link to='/' className='styledLink'>
            <h1>Booking</h1>
          </Link>
        </span>
        <div className='navItems'>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className='navButton'>
                <Link to='/dashboard' className='styledLink'>
                  Dashboard
                </Link>
              </button>
              <button className='navButton' onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className='navButton'>
                <Link to='/register' className='styledLink'>
                  Register
                </Link>
              </button>
              <button className='navButton'>
                <Link to='/login' className='styledLink'>
                  Login
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
