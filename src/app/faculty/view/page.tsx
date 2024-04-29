// @ts-nocheck
'use client'
import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

const page = () => {
  const [faculties, setFaculties] = React.useState([])

  React.useEffect(() => {
    fetch('/api/faculty')
      .then(res => res.json())
      .then(data => {
        setFaculties(data.data)
      })
  }, [])

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center'>View Faculties</h1>
        <div className='mt-8 space-y-6'>
          <DataGrid
            style={{
              width: '100%',
              height: '100%'
            }}
            rows={faculties}
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'email', headerName: 'Email', width: 200 },
              { field: 'phone', headerName: 'Phone', width: 200 },
              { field: 'uid', headerName: 'UID', width: 200 }
            ]}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}

export default page
