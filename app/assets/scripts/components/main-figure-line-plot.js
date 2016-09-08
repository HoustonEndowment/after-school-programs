import React from 'react'

export default function (data) {
  function scaleAndFormat (num) {
    return (num / data.highValTotal) * 100 + '%'
  }

  return (
    <div>
    <div className='lineplot'>
      <div className='line'
      style={{width: scaleAndFormat(Math.abs(data.students - data.slots)), left: scaleAndFormat(Math.min(data.students, data.slots))}}>
      </div>
      <div className='slot-dot' style={{left: scaleAndFormat(data.slots - 10)}}>
      </div>
      <div className='student-dot' style={{left: scaleAndFormat(data.students - 10)}}>
      </div>
      <div className='slots-count'>
        <span className='data-number slot-num'>{data.slots}</span>
        <span className='data-description'> available slots</span>
      </div>
      <div className='students-count'>
        <span className='data-number student-num'>{data.students}</span>
        <span className='data-description'> eligible students</span>
      </div>
      </div>
     </div>
  )
}
