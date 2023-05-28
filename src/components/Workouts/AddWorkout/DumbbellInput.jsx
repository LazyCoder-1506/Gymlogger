import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPaste } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DumbbellInput = (props) => {
  const [sets, setSets] = useState([{support: false}])

  const handleDumbbellChange = (i, value) => {
    const values = [...sets]
    values[i]['dumbbellWt'] = value.trim() === '' ? 0 : parseInt(value)
    updateSets(values)
  }

  const handleRepsChange = (i, value) => {
    const values = [...sets]
    values[i]['reps'] = value.trim() === '' ? 0 : parseInt(value)
    updateSets(values)
  }

  const handleSupportChange = (i, value) => {
    const values = [...sets]
    values[i]['support'] = value
    updateSets(values)
  }

  const handleAddSet = () => {
    const values = [...sets]
    values.push({support: false})
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
      <div>
        <p className='text-white font-bold underline underline-offset-4 decoration-2 decoration-sky-500'>{props.selectedExerciseName}</p>
      </div>
      
      {sets.map((set, idx) => (
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-2 md:gap-5" key={idx}>
          
          <div className='hidden col-span-2 lg:flex items-center'>
            <p className='font-semibold text-gray-400 text-sm'>SET {idx+1}</p>
          </div>
          
          <div className="lg:col-span-3 flex items-center">
            <input 
              type="text" 
              className="text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-blue-500 p-2 lg:px-3" 
              value={'dumbbellWt' in set ? set['dumbbellWt'] : ""}
              onChange={(e) => handleDumbbellChange(idx, e.target.value)}
              placeholder='Dumbbell weight'
            />
          </div>
          
          <div className="lg:col-span-3 flex items-center">
            <input 
              type="text" 
              className="text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-blue-500 p-2 lg:px-3" 
              value={'reps' in set ? set['reps'] : ""}
              onChange={(e) => handleRepsChange(idx, e.target.value)}
              placeholder='Repetitions'
            />
          </div>
          
          <div className='lg:col-span-2 flex items-center'>
            <label>
              <input
                type="checkbox"
                className='hidden support_checkbox' 
                checked={'support' in set ? set['support'] : false}
                onChange={(e) => handleSupportChange(idx, e.target.checked)}
              />
              <span className="cursor-pointer rounded text-sm text-gray-400 border border-gray-400 p-2 lg:px-3 support_label">Support</span>
            </label>
          </div>

          <div className="lg:col-span-2 flex justify-end items-center">
            <button 
              type='button'
              className='hover:bg-gray-700 rounded lg:text-lg p-1 lg:px-3 lg:py-2 mr-3'
              onClick={() => handleCopySet(idx)}
            >
              <FontAwesomeIcon icon={faPaste} />
            </button>
            <button 
              type='button'
              className='hover:bg-gray-700 rounded lg:text-lg p-1 lg:px-3 lg:py-2'
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

export default DumbbellInput