import React from 'react'

const Userprofile = ({params}:any) => {
  return (
    <div className='text-4xl'>Userprofile - {params.id}</div>
  )
}

export default Userprofile