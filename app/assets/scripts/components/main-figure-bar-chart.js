import React from 'react'

export default function (data) {
  return (
    <div className='barchart'>
      <div className='students-count'>
        <span className='barchart-bold-text'>{data.students}</span>
        <span className='barchart-small-text'>eligible students</span>
      </div>
      <div className='bars'>
        <div className='students-bar'
          style={{width: data.studentPercent}}>
          </div>
        <div className='slots-bar'
          style={{width: data.slotPercent}}>
        </div>
      </div>
      <div className='slots-count'>
        <span className='barchart-bold-text'>{data.slots}</span>
        <span className='barchart-small-text'>available slots</span>
      </div>
    </div>
  )
}
