'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  const [data, setData] = React.useState({
    uid: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/api/faculty/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await res.json()

    if (result.success) {
      router.push('/faculty/dashboard')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center'>Faculty Login</h1>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
