import React from 'react'
import './BillRow.css'
export const BillRow = ({children}) => {
  return (
    <div className='bill-row-container mt3 mb3'>
      {children}
    </div>
  )
}
