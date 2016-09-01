import React from 'react'

export default function (data) {
  return (
    <div className='barchart'>
      <div className='students-count'>
        <span className='data-number'>{data.students}</span>
        <span className='data-description'> eligible students</span>
      </div>
      <div className='bars'>
        <div className='students-bar'
          style={{width: data.studentPercent + '%'}}>
          </div>
        <div className='slots-bar'
          style={{width: data.slotPercent + '%'}}>
        </div>
      </div>
      <div className='slots-count'>
        <span className='data-number'>{data.slots}</span>
        <span className='data-description'> available slots</span>
      </div>
    </div>
  )
}
