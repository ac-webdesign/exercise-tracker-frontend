import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditExercise = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Use for navigation after form submission

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    // Fetch the exercise and user data when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/${id}`)
            .then(res => {
                setUsername(res.data.username);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setDate(new Date(res.data.date));
            })
            .catch((err) => console.log(err));

        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date,
        };

        console.log(exercise);

        axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        navigate('/'); // Redirect to home after submission
    };

    return (
        <div>
            <h3>Edit Exercise</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                        {users.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input 
                        type="text" 
                        required
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="number" 
                        required
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input 
                        type="submit" 
                        value="Save Exercise" 
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditExercise;
