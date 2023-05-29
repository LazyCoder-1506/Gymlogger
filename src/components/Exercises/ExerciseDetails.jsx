import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { renderDetailsByEquipment } from '../../utils/commonFunctions'

const ExerciseDetails = ({exercise, dismissModal}) => {
  const dataPoints = exercise.history.map(value => ({pv: value}))

  return (
    <div className='w-screen h-screen bg-black/80 z-10 fixed top-0 left-0'>
      <div className="w-9/10 max-w-screen-lg mx-auto my-auto p-4 md:p-8 rounded-lg bg-slate-900/100 border border-gray-700 transition-all duration-300 ease-in-out translate-y-[50px]">
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="col-span-3">
            <p className="font-medium text-lg text-white">{exercise.name}</p>
          </div>
          <div className="text-right">
            <button type='button' className='rounded-full p-1.5 px-3 hover:bg-gray-700' onClick={dismissModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className='grid grid-cols-2 gap-4 content-start'>
            <div>
              <p><span className="text-gray-400">Body Part : </span>{exercise.bodyPart}</p>
            </div>
            <div>
              <p><span className="text-gray-400">Equipment : </span>{exercise.equipment}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400 mb-2">Last Workout</p>
              {renderDetailsByEquipment(exercise.lastWorkout, exercise.equipment)}
            </div>
          </div>
          <div className='p-2'>
            <p className="text-gray-400 mb-2">History</p>
            <ResponsiveContainer width="100%" aspect={2.0}>
              <LineChart data={dataPoints}>
                <CartesianGrid fill='black' fillOpacity={0.3} vertical={false} stroke='#374151' />
                <Tooltip contentStyle={{ backgroundColor: "#0F172A", border: '1px solid grey' }} />
                <Line type="monotone" dataKey="pv" stroke="#1FD3EE" strokeWidth={2} dot={false} activeDot={{ stroke: '#1FD3EE' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDetails