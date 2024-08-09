import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ExerciseList from './components/exercises-list.component'

import Navbar from './components/navbar.component'
import EditExercise from './components/edit-exercise.component'
import CreateUser from './components/create-user.component'
import CreateExercise from './components/create-exercise.component'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br />
        <Routes>
          <Route path='/'  element={<ExerciseList/>}/>
          <Route path='/edit/:id' element={<EditExercise />} />
          <Route path='/create' element={<CreateExercise />} />
          <Route path='/user' element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
