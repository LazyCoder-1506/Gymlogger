import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const BarbellDetails = ({exerciseName, equipment, barbellWt, sets}) => {
  return (
    <div>
      <table className="table-fixed border-collapse w-full text-sm text-center">
        <caption className="caption-top mb-2 text-left">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">{exerciseName}</span>
          <span className="text-gray-400 ml-2">{equipment ? ' (' + equipment + ')' : ''}</span>
          <span className="float-right">Barbell weight : {barbellWt}</span>
        </caption>
        <thead className='bg-slate-700'>
          <tr>
            <th className='p-2 border-b border-slate-600 font-medium'>Total Plate Weight</th>
            <th className='p-2 border-b border-slate-600 font-medium'>Repetitions</th>
            <th className='p-2 border-b border-slate-600 font-medium'>Support</th>
          </tr>
        </thead>
        <tbody className='bg-slate-800'>
          {sets.map((set, index) => (
            <tr key={index}>
              <td className='p-2 border-b border-slate-600'>{set.plateWt}</td>
              <td className='p-2 border-b border-slate-600'>{set.reps}</td>
              <td className='p-2 border-b border-slate-600'>{set.support ? <FontAwesomeIcon icon={faCheck} className='text-green-400' /> : <FontAwesomeIcon icon={faXmark} className='text-red-400' />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BarbellDetails