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
        axios.get('http://localhost:5000/users')
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

        axios.post('http://localhost:5000/exercises/add',exercise)
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

// export default class CreateExercise extends Component {
//     constructor(props){
//         super(props);

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
//         this.onChangeDuration = this.onChangeDuration.bind(this);
//         this.onChangeDate = this.onChangeDate.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             username: '',
//             description : '',
//             duration : 0,
//             date: new Date(),
//             users: []
//         }
//     }

//     componentDidMount(){
//         axios.get('http://localhost:5000/users')
//             .then(response=>{
//                 if(response.data.length>0){
//                     this.setState({
//                         users: response.data.map(user=> user.username),
//                         username: response.data[0].username
//                     })
//                 }
//             })
//     }
//     onChangeUsername(e){
//         this.setState({
//             username: e.target.value
//         })
//     }
//     onChangeDescription(e){
//         this.setState({
//             description: e.target.value
//         })
//     }
//     onChangeDuration(e){
//         this.setState({
//             duration: e.target.value
//         })
//     }
//     onChangeDate(date){
//         this.setState({
//             date: date
//         })
//     }

//     onSubmit(e){
//         e.preventDefault();

//         const exercise = {
//             username : this.state.username,
//             description: this.state.description,
//             duration : this.state.duration,
//             date: this.state.date
//         }
        
//         console.log(exercise)

//         axios.post('http://localhost:5000/exercises/add', exercise)
//             .then(res => console.log(res.data))
//         window.location.href='/'
//     }

//     render(){
//             return(
//                 <div>
//                     <h3>Create New Exercise</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Username: </label>
//                         <select 
//                                 required
//                                 className='form-control'
//                                 value={this.state.username}
//                                 onChange={this.onChangeUsername}>
//                                 {
//                                     this.state.users.map(function(user){
//                                         return <option key={user} value={user}>
//                                                    {user}
//                                               </option>
//                                     })
//                                 }
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Description: </label>
//                         <input type="text" 
//                                 required
//                                 className='form-control'
//                                 value={this.state.description}
//                                 onChange={this.onChangeDescription}
//                             />
//                     </div>
//                     <div className="form-group">
//                         <label>Duration (in minutes): </label>
//                         <input type="text" 
//                                 required
//                                 className='form-control'
//                                 value={this.state.duration}
//                                 onChange={this.onChangeDuration}
//                             />
//                     </div>
//                     <div className="form-group">
//                         <label>Date: </label>
//                         <div>
//                             <DatePicker
//                                 selected={this.state.date}
//                                 onChange={this.onChangeDate}
//                             />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <input type="submit" value='Create Exercise' className='btn btn-primary'/>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }