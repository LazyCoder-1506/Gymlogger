import { Route, Routes } from 'react-router-dom';
import './App.css';

import ExercisePage from './components/Exercises/ExercisePage';
import AddWorkoutPage from './components/Workouts/AddWorkout/AddWorkoutPage';

function App() {
  return (
    <div className='bg-slate-900 text-slate-300 min-h-screen'>
      <Routes>
        <Route path='/' element={<AddWorkoutPage />} />
        <Route path='/exercises' element={<ExercisePage />} />
      </Routes>
    </div>
  );
}

export default App;
