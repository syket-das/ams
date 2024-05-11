// @ts-nocheck
'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  const [students, setStudents] = React.useState([
    {
      id: 1,
      name: 'John Doe',
      regNo: '123456',
      section: 'A'
    },
    {
      id: 2,
      name: 'John Doe',
      regNo: '123456',
      section: 'A'
    },
    {
      id: 3,
      name: 'John Doe',
      regNo: '123456',
      section: 'A'
    },
    {
      id: 4,
      name: 'John Doe',
      regNo: '123456',
      section: 'A'
    }
  ])

  const [presentStudents, setPresentStudents] = React.useState([])

  const [hoveredID, setHoveredID] = React.useState(null)

  const [section, setSection] = React.useState(null)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    setSection(JSON.parse(localStorage.getItem('section')))
  }, [])

  const fetchMore = async () => {
    const res = await fetch('/api/section', {
      method: 'GET'
    })

    const result = await res.json()

    if (result.success) {
      setData(result.data.find(item => item.id === section?.id))
    }
  }

  React.useEffect(() => {
    fetchMore()
  }, [section])

  if (!section) {
    return <div>Loading...</div>
  }

  return (
    <div className=''>
      <div className=' flex items-center bg-gray-200'>
        <div className='flex-1 mx-auto p-10'>
          {/* <ul className='grid grid-cols-12 grid-rows-4 gap-8 grid-flow-row'>
            {data?.students?.map(student => {
              const isPresent = presentStudents.some(
                presentStudent => presentStudent.id === student.id
              )

              return (
                <li key={student.id} className='rounded-lg '>
                  <div
                    onMouseEnter={() => setHoveredID(student.id)}
                    onMouseLeave={() => setHoveredID(null)}
                    onClick={() => {
                      if (isPresent) {
                        setPresentStudents(
                          presentStudents.filter(
                            presentStudent => presentStudent.id !== student.id
                          )
                        )
                      } else {
                        setPresentStudents([...presentStudents, student])
                      }
                    }}
                    className='h-24 w-24 bg-white rounded-full flex items-center justify-center '
                    style={{
                      borderColor: isPresent ? 'green' : 'gray',
                      borderWidth: '4px'
                    }}
                  >
                    <img
                      width='48'
                      height='48'
                      src='https://img.icons8.com/pulsar-line/48/user.png'
                      alt='user'
                      className='m-auto '
                    />
                  </div>
                  <div
                    className='bg-white h-8 w-24 rounded-md'
                    style={{
                      borderColor: isPresent ? 'green' : 'gray',
                      borderWidth: '4px'
                    }}
                  >
                    {hoveredID === student.id && (
                      <span className='text-center'>{student.regNo}</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul> */}

          {/* 6/6 grid foe empty bench */}
          {/* only seats not students */}

          <div className='grid grid-cols-6 gap-4'>
            {Array.from({ length: 36 }).map((_, index) => (
              <div
                key={index}
                className='h-24 w-24 bg-white rounded-full flex items-center justify-center'
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between items-center mt-2'>
        <div className='flex-1 flex gap-4'>
          <h1 className='text-2xl font-bold text-center'>Head Count</h1>
          <span className='text-2xl font-bold text-center'>
            {presentStudents.length}
          </span>
        </div>
        <div className='flex-1 flex gap-4'>
          <h1 className='text-2xl font-bold text-center'>Empty Seats</h1>
          <span className='text-2xl font-bold text-center'>
            {data?.students.length - presentStudents.length}
          </span>
        </div>

        <div className='flex-1'>
          <Button className='w-full' onClick={() => {}}>
            Mark Attendance
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page
