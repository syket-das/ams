'use client'
import React from 'react'

const page = () => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    phone: '',
    uid: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/api/faculty', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await res.json()

    if (result.success) {
      alert('Faculty added successfully')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center'>Add Faculty</h1>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='name' className='block'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full border border-gray-300 rounded-md px-2 py-2 '
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='email' className='block'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full border border-gray-300 rounded-md px-2 py-2 '
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='phone' className='block'>
              Phone
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              className='w-full border border-gray-300 rounded-md px-2 py-2 '
              value={data.phone}
              onChange={e => setData({ ...data, phone: e.target.value })}
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='uid' className='block'>
              UID
            </label>
            <input
              type='text'
              id='uid'
              name='uid'
              className='w-full border border-gray-300 rounded-md px-2 py-2 '
              value={data.uid}
              onChange={e => setData({ ...data, uid: e.target.value })}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full border border-gray-300 rounded-md px-2 py-2 '
              value={data.password}
              onChange={e => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className='space-y-2'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white rounded-md py-2'
            >
              Add Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
