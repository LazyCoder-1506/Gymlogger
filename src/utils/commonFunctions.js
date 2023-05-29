import BarbellDetails from '../components/Workouts/ShowWorkout/BarbellDetails'
import BodyweightDetails from '../components/Workouts/ShowWorkout/BodyweightDetails'
import DumbbellDetails from '../components/Workouts/ShowWorkout/DumbbellDetails'
import DurationDetails from '../components/Workouts/ShowWorkout/DurationDetails'
import WeightDetails from '../components/Workouts/ShowWorkout/WeightDetails'

export const compareName =  function (a, b) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

export const getExerciseObjectById = function (exercises, id) {
  return exercises.find( o => o.id === id)
}

export const renderDetailsByEquipment = (workout, equipment) => {
  switch(equipment) {
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