import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Routes>
      {/* public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/hotels' element={<List />} />
      <Route path='/hotels/:id' element={<Hotel />} />

      {/* login user only */}
      <Route
        path='/dashboard'
        element={
          currentUser ? <Dashboard /> : <Navigate to='/login' replace={true} />
        }
      />

      {/* only for user who not login */}
      <Route
        path='/login'
        element={!currentUser ? <Login /> : <Navigate to='/' replace={true} />}
      />
      <Route
        path='/register'
        element={
          !currentUser ? <Register /> : <Navigate to='/' replace={true} />
        }
      />
    </Routes>
  );
}

export default App;
