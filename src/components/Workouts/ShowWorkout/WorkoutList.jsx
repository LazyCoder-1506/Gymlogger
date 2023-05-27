import React, { useEffect, useState } from 'react'
import ExerciseDataService from '../../../services/exercise.services';

import BarbellDetails from './BarbellDetails'
import BodyweightDetails from './BodyweightDetails'
import DumbbellDetails from './DumbbellDetails'
import DurationDetails from './DurationDetails'
import WeightDetails from './WeightDetails'

const WorkoutList = ({savedWorkout}) => {

  const [allWorkoutDetails, setAllWorkoutDetails] = useState([])

  useEffect(() => {
    fetchExerciseDetails()
  }, [savedWorkout])

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

  const renderDetailsByEquipment = (workout) => {
    switch(workout.equipment) {
      case 'Barbell':
        return <BarbellDetails exerciseName={workout.name} equipment={workout.equipment} barbellWt={workout.barbellWt} sets={workout.sets} />
      case 'Bodyweight':
        return <BodyweightDetails exerciseName={workout.name} equipment={workout.equipment} sets={workout.sets} />
      case 'Cable':
        return <WeightDetails exerciseName={workout.name} equipment={workout.equipment} sets={workout.sets} />
      case 'Dumbbell':
        return <DumbbellDetails exerciseName={workout.name} equipment={workout.equipment} sets={workout.sets} />
      case 'Duration':
        return <DurationDetails exerciseName={workout.name} equipment={workout.equipment} sets={workout.sets} />
      case 'Weight':
        return <WeightDetails exerciseName={workout.name} equipment={workout.equipment} sets={workout.sets} />
      default:
        return ''
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {allWorkoutDetails.map(workout => renderDetailsByEquipment(workout))}
    </div>
  )
}

export default WorkoutList