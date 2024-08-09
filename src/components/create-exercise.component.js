import React, { useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateExercise = () =>{
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration]= useState(0)
    const [date, setDate]= useState(new Date())
    const [users, setUsers]= useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://exercise-tracker-backend-kxgd.onrender.com/users')
            .then(res=>{
                if(res.data.length>0){
                    setUsers(res.data.map(user=> user.username))
                    setUsername(res.data[0].username)
                }
            })
            .catch(err=> console.log(err))
    },[])

    const onChangeUsername =(e)=>{
        setUsername(e.target.value)
    }
    const onChangeDescription =(e)=>{
        setDescription(e.target.value)
    }
    const onChangeDuration =(e)=>{
        setDuration(e.target.value)
    }
    const onChangeDate =(date)=>{
        setDate(date)
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        }
        console.log(exercise);

        axios.post('https://exercise-tracker-backend-kxgd.onrender.com/exercises/add',exercise)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        navigate('/');
    }

    

    return(
        <div>
            <h3>Create New Exercise</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                            required
                            className='form-control'
                            value={username}
                            onChange={onChangeUsername}>
                            {
                                users.map(function(user){
                                    return <option key={user} value={user}>
                                            {user}
                                        </option>
                                })
                            }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" 
                            required
                            className='form-control'
                            value={description}
                            onChange={onChangeDescription}
                        />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" 
                            required
                            className='form-control'
                            value={duration}
                            onChange={onChangeDuration}
                        />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value='Create Exercise' className='btn btn-primary'/>
                </div>
            </form>
        </div>
        )
}
export default CreateExercise