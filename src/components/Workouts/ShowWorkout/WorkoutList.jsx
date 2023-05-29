import React, { useEffect, useState } from 'react'
import ExerciseDataService from '../../../services/exercise.services';
import { renderDetailsByEquipment } from '../../../utils/commonFunctions';

const WorkoutList = ({savedWorkout}) => {

  const [allWorkoutDetails, setAllWorkoutDetails] = useState([])

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      const values = []
      if ('workouts' in savedWorkout) {
        for(const workout of savedWorkout.workouts) {
          try {
            const exerciseDoc = await ExerciseDataService.getExerciseById(workout.exerciseId)
            const combinedData = {...workout, ...(exerciseDoc.data())}
            values.push(combinedData)
          } catch (err) {
            console.log(err)
          }
        }
      }
      setAllWorkoutDetails(values)
    }

    fetchExerciseDetails()
  }, [savedWorkout])

  return (
    <div className='flex flex-col gap-4'>
      {allWorkoutDetails.map(workout => renderDetailsByEquipment(workout, workout.equipment))}
    </div>
  )
}

export default WorkoutList