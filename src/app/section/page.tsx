// @ts-nocheck
'use client'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const page = () => {
  const [sections, setSections] = React.useState([])
  const [data, setData] = React.useState({
    name: '',
    studentIds: '',
    courseId: ''
  })

  const [selectedStudents, setSelectedStudents] = React.useState([])

  useEffect(() => {
    if (data.studentIds) {
      const studentIds = data.studentIds.split(',')
      setSelectedStudents(studentIds)
    }
  }, [data.studentIds])

  React.useEffect(() => {
    fetch('/api/section')
      .then(res => res.json())
      .then(data => {
        setSections(data.data)
      })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/api/section', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        studentIds: data.studentIds.split(',')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await res.json()

    if (result.success) {
      alert('Section added successfully')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center'>View Sections</h1>
        <div className='mt-8 space-y-6'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>Add Section</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add Section</DialogTitle>
                <DialogDescription>
                  Fill in the form below to add a new section
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Course Id
                  </Label>
                  <Input
                    id='name'
                    value={data.courseId}
                    onChange={e =>
                      setData({ ...data, courseId: e.target.value })
                    }
                    className='col-span-3'
                  />
                </div>

                <div className='my-4'>
                  <h1 className='text-lg font-bold'>Select Students</h1>
                  <div className='grid grid-cols-1 gap-4 w-full'>
                    {selectedStudents.map(student => (
                      <div
                        key={student}
                        className='bg-gray-800 text-white p-2 rounded-md'
                      >
                        {student}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Student Ids
                  </Label>
                  <Textarea
                    id='name'
                    placeholder='Enter student ids separated by comma'
                    value={data.studentIds}
                    onChange={e =>
                      setData({ ...data, studentIds: e.target.value })
                    }
                    className='col-span-3'
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DataGrid
            style={{
              width: '100%',
              height: '100%'
            }}
            rows={sections}
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'name', headerName: 'Name', width: 200 },
              {
                field: 'course',
                headerName: 'Course',
                width: 200,
                renderCell: params => {
                  return (
                    <div>
                      {params?.row?.SectionOnCourse.map(
                        sectionOnCourse => sectionOnCourse.course.name + ' '
                      )}
                    </div>
                  )
                }
              },

              {
                field: 'students',
                headerName: 'Students',
                width: 200,

                renderCell: params => {
                  return (
                    <div
                      onClick={() => {
                        alert(
                          params.row.students
                            .map(student => student.name)
                            .join(', ')
                        )
                      }}
                    >
                      {params.row.students.length}{' '}
                      <span className='text-blue-500 cursor-pointer'>View</span>
                    </div>
                  )
                }
              }
              //   { field: 'regNo', headerName: 'Registration No', width: 200 }
            ]}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            className='w-full text-white'
          />
        </div>
      </div>
    </div>
  )
}

export default page
