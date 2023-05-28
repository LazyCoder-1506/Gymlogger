import React, { useRef, useState } from 'react'
import ExerciseDataService from '../../services/exercise.services'
import { bodyParts, equipments } from '../../static/data'

const AddExercise = () => {
  const [bodyPart, setBodyPart] = useState("")
  const [name, setName] = useState("")
  const [equipment, setEquipment] = useState("")
  const [errorMsg, setErrorMsg] = useState('');

  const bodyPartRef = useRef()
  const nameRef = useRef()
  const equipmentRef = useRef()

  const validateInput = () => {
    const fields = [
      {
        ref: bodyPartRef,
        value: bodyPart,
        message: 'Choose a Body Part'
      },
      {
        ref: nameRef,
        value: name,
        message: 'Exercise name should not be blank'
      },
      {
        ref: equipmentRef,
        value: equipment,
        message: 'Choose an equipment'
      }
    ];
    const isNotFilled = fields.some(field => {
      if (field.value.trim() === '') {
        setErrorMsg(field.message);
        field.ref.current.focus()
        field.ref.current.setCustomValidity('error')
        return true;
      }
      setErrorMsg('');
      return false;
    });
    return isNotFilled;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const isInvalid = validateInput()
    if (!isInvalid) {
      const newExercise = {
        bodyPart: bodyPart,
        equipment: equipment,
        name: name,
        lastWorkout: {},
        history: []
      }
  
      try {
        await ExerciseDataService.addExercise(newExercise)
        setBodyPart('')
        setName('')
        setEquipment('')
        setErrorMsg('')
      } catch (err) {
        setErrorMsg('Failed to save exercise')
      }
    }
  }

  return (
    <div className='flex flex-col gap-4 p-4 md:p-8 text-inherit bg-inherit'>
      <p className="text-xl text-white font-bold">Add New Exercise</p>
      <form 
        className='flex flex-col gap-3'
        onSubmit={handleSubmit}
      >
        {errorMsg && <p className='text-red-400 font-semibold'>{errorMsg}</p>}
        <div>
          <label htmlFor="select_body_part" className="text-white block mb-2">Select Body Part</label>
          <select 
            id='select_body_part' 
            className='text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-sky-500 px-3 py-2 capitalize'
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            ref={bodyPartRef}
          >
            <option selected disabled value="">Select</option>
            {bodyParts.map((part, index) => {
              return <option value={part} key={index}>{part}</option>
            })}
          </select>
        </div>
        
        <div>
          <label htmlFor="exercise_name" className="text-white block mb-2">Exercise Name</label>
          <input 
            type="text" 
            name="execise_name" 
            id="exercise_name" 
            className="text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-sky-500 px-3 py-2" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='off'
            ref={nameRef}
          />
        </div>
        
        <div>
          <label htmlFor="select_equipment" className="text-white block mb-2">Select Equipment</label>
          <select 
            id='select_equipment' 
            className='text-sm block w-full bg-gray-700 rounded border border-gray-400 focus:border-cyan-400 focus:ring-sky-500 px-3 py-2 capitalize'
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            ref={equipmentRef}
          >
            <option selected disabled value="">Select</option>
            {equipments.map((equipment, index) => {
              return <option value={equipment} key={index}>{equipment}</option>
            })}
          </select>
        </div>

        <div className='flex justify-center'>
          <button type="submit" className='text-white bg-sky-600 hover:bg-sky-700 focus:ring focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-600 rounded-lg px-5 py-2.5 mt-5'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddExercise