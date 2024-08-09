import React from 'react'
import axios from 'axios'
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = ()=>{
    const [username, setUsername] = useState('')
    const navigate= useNavigate();

    const onChangeUsername = (e)=>{
        setUsername(e.target.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const user = {
            username: username
        }

        console.log(user)

        axios.post('https://exercise-tracker-backend-kxgd.onrender.com/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        
        setUsername(''); //CLEAR INPUT

        navigate('/'); //NAVIGATE BACK 
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                            required
                            className='form-control'
                            value={username}
                            onChange={onChangeUsername} />
                </div>
                <div className="form-group">
                    <input type="submit" className='btn btn-primary' value='Create User' />
                </div>
            </form>
        </div>
    )
}
export default CreateUser
