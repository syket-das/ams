// @ts-nocheck
'use client'
import React from 'react'

const page = () => {
  const [students, setStudents] = React.useState([])

  React.useEffect(() => {
    fetch('/api/student')
      .then(res => res.json())
      .then(data => {
        setStudents(data.data)
      })
  }, [])

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center'>View Students</h1>
        <div className='mt-8 space-y-6'>
          {students.map(student => (
            <div
              key={student.id}
              className='border border-gray-300 rounded-md p-4'
            >
              <h2 className='font-bold text-xl'>{student.name}</h2>
              <p>{student.email}</p>
              <p>{student.phone}</p>
              <p>{student.regNo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
