// @ts-nocheck
'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { TbBrandNextjs } from 'react-icons/tb'

const page = () => {
  const [faculty, setFaculty] = React.useState(null)
  const [selected, setSelected] = React.useState({
    course: null,
    section: null
  })

  const [data, setData] = React.useState([])

  const router = useRouter()

  useEffect(() => {
    setFaculty(JSON.parse(localStorage.getItem('faculty')))
  }, [])

  const fetchAttendence = async () => {
    const res = await fetch('/api/attendence', {
      method: 'GET'
    })

    const result = await res.json()

    if (result.success) {
      setData(
        result.data.filter(item => {
          return (
            item.section.id === selected.section &&
            item.course.id === selected.course
          )
        })
      )
    }
  }

  useEffect(() => {
    if (selected.section && selected.course) {
      fetchAttendence()
    }
  }, [selected])

  const handleAttendence = async () => {
    const res = await fetch('/api/attendence', {
      method: 'POST',
      body: JSON.stringify({
        sectionId: selected.section,
        courseId: selected.course
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await res.json()

    if (result.success) {
      fetchAttendence()
    }
  }

  return (
    <div className=''>
      <div className='mx-auto flex  justify-center gap-4 '>
        <div className='cursor-pointer hover:border-green-500 relative overflow-hidden rounded-lg border bg-background p-2 text-center flex-1'>
          {faculty?.sectionOnCourseForFaculty.map(item => (
            <div key={item.id} className='flex gap-4 items-center my-4'>
              <TbBrandNextjs className='text-2xl' />
              <span>
                {item.course.name} ({item.course.code})
              </span>

              <span className='ml-auto'>{item.section.name}</span>
              <button
                onClick={() => {
                  localStorage.setItem('section', JSON.stringify(item.section))
                  localStorage.setItem('course', JSON.stringify(item.course))
                  setSelected({
                    course: item.course.id,
                    section: item.section.id
                  })
                }}
                className='bg-green-500 text-white rounded-md p-2 ml-auto'
              >
                {selected.section === item.section.id ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>{' '}
        <div className='cursor-pointer hover:border-green-500 relative overflow-hidden rounded-lg border bg-background p-2 text-center flex-1'>
          <h1 className='text-2xl font-bold'>Attendence</h1>

          {selected.section && selected.course ? (
            <Button
              onClick={() => {
                handleAttendence()
              }}
            >
              Initiate Attendence
            </Button>
          ) : null}

          <hr />
          {data.map(item => (
            <div key={item.id} className='flex gap-4 items-center my-4'>
              <span>{item.date}</span>
              <span className='ml-auto'>
                {item.submitted ? 'Submitted' : 'Not Submitted'}
              </span>
              <button
                onClick={() => {
                  localStorage.setItem('attendence', JSON.stringify(item))
                  router.push('/faculty/dashboard/attendance')
                }}
                className='bg-green-500 text-white rounded-md p-2 ml-auto'
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
