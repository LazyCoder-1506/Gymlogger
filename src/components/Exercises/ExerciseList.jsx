import React, { useEffect, useState } from 'react'
import ExerciseDataService from '../../services/exercise.services';
import { bodyParts } from '../../static/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { compareName } from '../../utils/commonFunctions';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    const data = await ExerciseDataService.getAllExercises()
    const processedData = data.docs.map((doc) => ({ ...(doc.data()), id: doc.id }))
    processedData.sort(compareName)
    setExercises(processedData)
  }

  return (
    <div className='flex flex-col gap-4 p-8 text-inherit bg-inherit'>
      <p className="text-xl text-white font-bold">List of Exercises
        <button className="float-right bg-gray-700 hover:bg-gray-600 rounded px-3 py-2" onClick={getExercises}>
          <FontAwesomeIcon icon={faArrowRotateRight} size='xs' />
        </button>
      </p>

      {bodyParts.map((bodyPart) => (
        <div>
          <p className="uppercase text-white font-medium mb-1 border-b border-gray-500">{bodyPart}</p>
          <div className="px-2 flex flex-col gap-1">
            {exercises.filter((exercise) => exercise.bodyPart === bodyPart).map((exercise) => (
              <p key={exercise.id} className="text-gray font-sm">{exercise.name} <span className="italic text-gray-400">({exercise.equipment})</span></p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExerciseList