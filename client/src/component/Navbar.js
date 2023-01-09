import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useLocation} from 'react-router-dom';
import UserContext from './Context/User/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import Profile from './Profile';

export default function Navbar() {
    let location = useLocation();
    const context = useContext(UserContext);
    const {user,getUser} = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('auth-token')){
          getUser();
        } else {
          navigate('/login');
        }
        // eslint-disable-next-line
    }, [])
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname === '/'?"active":""}`} to='/'>Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/about'?"active":""}`} to = '/about'>about</Link>
                    </li>
                </ul>
            </div>
            <button type="button" className="bg-info rounded-circle p-2" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                   {user.name[0]}{user.name[user.name.indexOf(' ')+1]}
            </button>
        </div>
    </nav>
    <Profile name = {user.name} email = {user.email}/>

    </>
  )
}
