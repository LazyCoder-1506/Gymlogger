import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { bodyParts } from '../../../static/data';
import ExerciseDataService from '../../../services/exercise.services';
import WorkoutDataService from '../../../services/workout.services';

import "react-datepicker/dist/react-datepicker.css";
import { compareName } from '../../../utils/commonFunctions';
import BarbellInput from './BarbellInput';
import DumbbellInput from './DumbbellInput';
import BodyweightInput from './BodyweightInput';
import DurationInput from './DurationInput';
import WeightInput from './WeightInput';
import WorkoutList from '../ShowWorkout/WorkoutList';

const AddWorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateString, setSelectedDateString] = useState("")
  const [bodyPart, setBodyPart] = useState("")
  const [exercises, setExercises] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState("")
  const [workoutDetails, setWorkoutDetails] = useState({})
  const [savedWorkout, setSavedWorkout] = useState({})

  useEffect(() => {
    const dateString = selectedDate.getDate() + '/' + (selectedDate.getMonth() + 1) + '/' + selectedDate.getFullYear()
    setSelectedDateString(dateString)
    getWorkoutForSelectedDate(dateString)
  }, [selectedDate])

  const handleBodyPartSelect = (selectedPart) => {
    setBodyPart(selectedPart)
    setSelectedExerciseId("")
    getExercises(selectedPart)
  }

  const getPropertyFromExerciseId = (key) => {
    const ex = exercises.find(o => o.id === selectedExerciseId)
    return ex[key]
  }

  const getExercises = async (selectedPart) => {
    try {
      const data = await ExerciseDataService.getExercisesByBodyPart(selectedPart)
      const processedData = data.docs.map((doc) => ({ ...(doc.data()), id: doc.id }))
      processedData.sort(compareName)
      setExercises(processedData)
    } catch (err) {
      console.log(err)
    }
  }

  const getWorkoutForSelectedDate = async (dateString) => {
    try {
      const snapshot = await WorkoutDataService.getWorkoutForDate(dateString)
      if (!snapshot.empty)  {
        const doc = snapshot.docs[0]
        const data = {...(doc.data()), id: doc.id}
        setSavedWorkout(data)
      } else {
        setSavedWorkout({})
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.keys(savedWorkout).length === 0) {
      // add
      const exercise = {
        exerciseId: selectedExerciseId,
        ...workoutDetails
      }
      const newWorkout = {
        date: selectedDateString,
        workouts: [exercise]
      }

      try {
        await WorkoutDataService.addWorkout(newWorkout)
        resetAfterSubmit()
      } catch (err) {
        console.log(err)
      }
    } else {
      // update
      const exercise = {
        exerciseId: selectedExerciseId,
        ...workoutDetails
      }
      const docId = savedWorkout.id
      const newWorkout = {...savedWorkout}
      newWorkout.workouts.push(exercise)
      delete newWorkout.id

      try {
        await WorkoutDataService.updateWorkout(docId, newWorkout)
        resetAfterSubmit()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const resetAfterSubmit = () => {
    updateExerciseHistory()
    getWorkoutForSelectedDate(selectedDateString)
    setSelectedExerciseId("")
    setWorkoutDetails({})
  }

  const updateExerciseHistory = async () => {
    try {
      const exerciseDoc = await ExerciseDataService.getExerciseById(selectedExerciseId)
      const newExerciseDoc = {...(exerciseDoc.data())}
      newExerciseDoc.lastWorkout =  workoutDetails
      newExerciseDoc.history.push(...getTrendPoints(workoutDetails))

      try {
        await ExerciseDataService.updateExercise(selectedExerciseId, newExerciseDoc)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getTrendPoints = (workoutDetails) => {
    switch(getPropertyFromExerciseId('equipment')) {
      case 'Barbell':
        return workoutDetails.sets.map((set) => (workoutDetails.barbellWt + set.plateWt))
      case 'Bodyweight':
        return workoutDetails.sets.map((set) => (set.reps))
      case 'Cable':
        return workoutDetails.sets.map((set) => (set.weight))
      case 'Dumbbell':
        return workoutDetails.sets.map((set) => (set.dumbbellWt))
      case 'Duration':
        return workoutDetails.sets.map((set) => (set.duration))
      case 'Weight':
        return workoutDetails.sets.map((set) => (set.weight))
      default:
        return []
    }
  }

  const renderInputByEquipment = () => {
    switch(getPropertyFromExerciseId('equipment')) {
      case 'Barbell':
        return <BarbellInput passSetsCallback={setWorkoutDetails} selectedExerciseName={getPropertyFromExerciseId('name')} />
      case 'Bodyweight':
        return <BodyweightInput passSetsCallback={setWorkoutDetails} selectedExerciseName={getPropertyFromExerciseId('name')} />
      case 'Cable':
        return <WeightInput passSetsCallback={setWorkoutDetails} selectedExerciseName={getPropertyFromExerciseId('name')} />
      case 'Dumbbell':
        return <DumbbellInput passSetsCallback={setWorkoutDetails} selectedExerciseName={getPropertyFromExerciseId('name')} />
      case 'Duration':
        return <DurationInput passSetsCallback={setWorkoutDetails} selectedExerciseName={getPropertyFromExerciseId('name')} />
      case 'Weight':
        return <WeightInput passSetsCallback={setWorkoutDetails} selectedExerciseName={getPropertyFromExerciseId('name')} />
      default:
        return ''
    }
  }

  return (
    <div className='grid grid-cols-2 gap-8'>
      <div className='p-8'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="select_body_part" className="text-white block mb-2">Select Body Part</label>
            <select 
              id='select_body_part' 
              className='text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-blue-500 px-3 py-2 capitalize'
              value={bodyPart}
              onChange={(e) => handleBodyPartSelect(e.target.value)}
            >
              <option selected disabled value="">Select</option>
              {bodyParts.map((part, index) => {
                return <option value={part} key={index}>{part}</option>
              })}
            </select>
          </div>

          {exercises.length ? (
            <div>
              <label htmlFor="select_exercise" className="text-white block mb-2">Select Exercise</label>
              <select 
                id='select_exercise' 
                className='text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-blue-500 px-3 py-2 capitalize'
                value={selectedExerciseId}
                onChange={(e) => setSelectedExerciseId(e.target.value)}
                // ref={bodyPartRef}
              >
                <option selected disabled value="">Select</option>
                {exercises.map((exercise, index) => {
                  return <option value={exercise.id} key={index}>{exercise.name} ({exercise.equipment})</option>
                })}
              </select>
            </div>
          ) : ''}

          <div className='mt-6'>
            {selectedExerciseId.length > 1 ? renderInputByEquipment() : ''}
          </div>

          <div>
            <button 
              type="submit"
              className='text-white text-sm bg-sky-600 hover:bg-sky-700 focus:ring focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-600 rounded px-4 py-2 mt-5'
            >
              Add Workout
            </button>
          </div>

        </form>
      </div>
      <div className="flex flex-col gap-8 p-8">
        <ReactDatePicker 
          name="date" 
          id="date" 
          className="text-sm bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-blue-500 px-3 py-2 mt-2"
          dateFormat="dd/MM/yyyy" 
          selected={selectedDate}
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showPopperArrow={false}
          // autoComplete='off'
          // ref={nameRef}
        />

        <WorkoutList savedWorkout={savedWorkout} />
      </div>
    </div>
  )
}

export default AddWorkoutPage