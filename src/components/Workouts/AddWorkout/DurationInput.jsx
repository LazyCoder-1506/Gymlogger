import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPaste } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DurationInput = (props) => {
  const [sets, setSets] = useState([{}])

  const handleDurationChange = (i, value) => {
    const values = [...sets]
    values[i]['duration'] = value.trim() === '' ? 0 : parseInt(value)
    updateSets(values)
  }
  const handleAddSet = () => {
    const values = [...sets]
    values.push({})
    updateSets(values)
  }

  const handleDeleteSet = (i) => {
    const values = [...sets]
    values.splice(i, 1)
    updateSets(values)
  }

  const handleCopySet = (i) => {
    const values = [...sets]
    const copy = {...values[i]}
    values.push(copy)
    updateSets(values)
  }

  const updateSets = (values) => {
    setSets(values)
    props.passSetsCallback({ sets: values })
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className='text-white font-bold underline underline-offset-4 decoration-2 decoration-sky-500'>{props.selectedExerciseName}</p>
        </div>
      </div>
      
      {sets.map((set, idx) => (
        <div className="grid grid-cols-12 gap-5" key={idx}>
          
          <div className='col-span-2 flex items-center'>
            <p className='font-semibold text-gray-400 text-sm'>SET {idx+1}</p>
          </div>
          
          <div className="col-span-3">
            <input 
              type="text" 
              className="text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-blue-500 px-3 py-2" 
              value={'duration' in set ? set['duration'] : ""}
              onChange={(e) => handleDurationChange(idx, e.target.value)}
              placeholder='Duration'
            />
          </div>
          
          <div className="col-span-3"></div>
          
          <div className='col-span-2 flex items-center'></div>

          <div className="col-span-2 text-right">
            <button 
              type='button'
              className='hover:bg-gray-700 rounded text-lg px-3 py-2 mr-3'
              onClick={() => handleCopySet(idx)}
            >
              <FontAwesomeIcon icon={faPaste} />
            </button>
            <button 
              type='button'
              className='hover:bg-gray-700 rounded text-lg px-3 py-2'
              onClick={() => handleDeleteSet(idx)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>

        </div>
      ))}

      <div>
        <button 
          type='button'
          className='hover:bg-gray-700 rounded text-lg px-3 py-2 mr-6' 
          onClick={handleAddSet}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        
      </div>
    </div>
  )
}

export default DurationInput