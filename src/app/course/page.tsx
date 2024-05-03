// @ts-nocheck
'use client'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
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

const page = () => {
  const [students, setStudents] = React.useState([])
  const [data, setData] = React.useState({
    name: '',
    code: '',
    facultyId: ''
  })

  React.useEffect(() => {
    fetch('/api/course')
      .then(res => res.json())
      .then(data => {
        setStudents(data.data)
      })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/api/course', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await res.json()

    if (result.success) {
      alert('Course added successfully')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center'>View Courses</h1>
        <div className='mt-8 space-y-6'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>Add Course</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
                <DialogDescription>
                  Fill in the form below to add a new course
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
                    Code
                  </Label>
                  <Input
                    id='name'
                    value={data.code}
                    onChange={e => setData({ ...data, code: e.target.value })}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Faculty Id
                  </Label>
                  <Input
                    id='name'
                    value={data.facultyId}
                    onChange={e =>
                      setData({ ...data, facultyId: e.target.value })
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
            rows={students}
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'code', headerName: 'Code', width: 200 },
              {
                field: 'faculty',
                headerName: 'Faculty',
                width: 200,

                renderCell: params => {
                  return <div>{params.row.faculty.name}</div>
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
