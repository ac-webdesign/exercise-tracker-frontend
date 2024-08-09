import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = ()=>{
    return(
        <nav className='navbar navbar-dark bg-dark navbar-expand'>
            <Link to='/' className='navbar-brand'>ExerciseTracker</Link>
            <div className="collapse navbar-collapse"></div>
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to='/' className='nav-link'>Exercises</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/create' className='nav-link'>Create Exercise</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/user' className='nav-link'>Create User</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar