import React from 'react'
import ExerciseList from './ExerciseList'
import AddExercise from './AddExercise'

const ExercisePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <ExerciseList />
      </div>
      <div>
        <AddExercise />
      </div>
    </div>
  )
}

export default ExercisePage