import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Exercise = ({ exercise, deleteExercise }) => {
    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={`/edit/${exercise._id}`}>edit</Link> | 
                <button 
                    onClick={() => deleteExercise(exercise._id)} 
                    className="btn btn-link p-0 m-0 align-baseline"
                    style={{ border: 'none', background: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

const ExerciseList = ()=>{
    const [exercises, setExercises] = useState([])

    useEffect(()=>{
        axios.get('https://exercise-tracker-backend-kxgd.onrender.com/exercises')
            .then(res=> setExercises(res.data))
            .catch(err=> console.log(err))
    },[])

    const deleteExercise = (id)=>{
        axios.delete(`https://exercise-tracker-backend-kxgd.onrender.com/exercises/${id}`)
            .then(res=> console.log(res.data))
            .catch(err => console.log(err))

        setExercises(exercises.filter(el=>el._id !== id))
    }

    const exerciseList = ()=>{
        return exercises.map(currentexercise =>(
            <Exercise
                exercise={currentexercise}
                deleteExercise={deleteExercise}
                key={currentexercise._id}
            />
        ))
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}
export default ExerciseList