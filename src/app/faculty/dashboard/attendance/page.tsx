// @ts-nocheck
'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  const [presentStudents, setPresentStudents] = React.useState([])
  const [students, setStudents] = React.useState([])
  const [attendence, setAttendence] = React.useState(null)
  const [selectedIndexes, setSelectedIndexes] = React.useState([])

  const [section, setSection] = React.useState(null)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    setSection(JSON.parse(localStorage.getItem('section')))
    setAttendence(JSON.parse(localStorage.getItem('attendence')))
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

  const fetchStudentsSeats = async () => {
    const res = await fetch('/api/attendence/studentseat', {
      method: 'GET'
    })

    const result = await res.json()

    if (result.success) {
      setStudents(
        result.data.filter(item => item.attendenenceId === attendence.id)
      )
    }
  }

  React.useEffect(() => {
    fetchMore()
  }, [section])

  React.useEffect(() => {
    if (section) {
      fetchStudentsSeats()
    }
  }, [section])

  if (!section) {
    return <div>Loading...</div>
  }

  const verifyAttendance = async () => {
    const bookedSeats = students.map(student => {
      return {
        studentId: student.id,
        seatNo: student.seatNo
      }
    })

    const selectedSeats = selectedIndexes.map(index => {
      return {
        seatNo: index
      }
    })

    if (bookedSeats.length !== selectedSeats.length) {
      alert('Attendance not matched')
      return
    }
    const matchedOrNot = selectedSeats.every(selectedSeat => {
      return bookedSeats.some(bookedSeat => {
        return bookedSeat.seatNo === selectedSeat.seatNo
      })
    })

    if (!matchedOrNot) {
      alert('Attendance not matched')
      return
    }

    const modifiedStudents = students.map(student => {
      return {
        studentId: student.id,
        seatNo: student.seatNo
      }
    })

    const res = await fetch('/api/attendence', {
      method: 'PUT',
      body: JSON.stringify({
        attendenenceId: attendence.id,
        attendences: modifiedStudents
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await res.json()
    if (result.success) {
      alert('Attendance Marked')
    }
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
            {Array.from({ length: 36 }).map((_, index) => {
              const column = Math.floor(index / 6) + 1
              const row = (index % 6) + 1
              const label = `c${column}r${row}`

              return (
                <div
                  onClick={() => {
                    if (selectedIndexes.includes(label)) {
                      setSelectedIndexes(
                        selectedIndexes.filter(item => item !== label)
                      )
                    } else {
                      setSelectedIndexes([...selectedIndexes, label])
                    }
                  }}
                  style={{
                    borderColor: selectedIndexes.includes(label)
                      ? 'green'
                      : 'gray',
                    borderWidth: '4px'
                  }}
                  key={index}
                  className='h-24 w-24 bg-white rounded-full flex items-center justify-center'
                >
                  {label}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between items-center mt-2'>
        <div className='flex-1 flex gap-4'>
          <h1 className='text-2xl font-bold text-center'>Head Count</h1>
          <span className='text-2xl font-bold text-center'>
            {selectedIndexes.length}
          </span>
        </div>
        <div className='flex-1 flex gap-4'>
          <h1 className='text-2xl font-bold text-center'>Empty Seats</h1>
          <span className='text-2xl font-bold text-center'>
            {36 - selectedIndexes.length}
          </span>
        </div>

        <div className='flex-1'>
          <Button
            className='w-full'
            onClick={() => {
              verifyAttendance()
            }}
          >
            Mark Attendance
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page
