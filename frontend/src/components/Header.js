import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">HealthMate</h1>
      <nav>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <button onClick={logout} className="bg-white text-blue-600 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
