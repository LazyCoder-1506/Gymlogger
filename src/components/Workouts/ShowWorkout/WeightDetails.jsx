import React from 'react'

const WeightDetails = ({exerciseName, equipment, sets}) => {
  return (
    <div>
      <table className="table-fixed border-collapse w-full text-sm text-center">
        <caption className="caption-top mb-2 text-left">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">{exerciseName}</span>
          <span className="text-gray-400 ml-2">{equipment ? ' (' + equipment + ')' : ''}</span>
        </caption>
        <thead className='bg-slate-700'>
          <tr>
            <th className='p-2 border-b border-slate-600 font-medium'>Total Weight</th>
            <th className='p-2 border-b border-slate-600 font-medium'>Repetitions</th>
          </tr>
        </thead>
        <tbody className='bg-slate-800'>
          {sets.map((set, index) => (
            <tr key={index}>
              <td className='p-2 border-b border-slate-600'>{set.weight}</td>
              <td className='p-2 border-b border-slate-600'>{set.reps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WeightDetails