import Link from 'next/link'
import { GoPlus } from 'react-icons/go'
import { FaReact } from 'react-icons/fa'
import { BiLogoMongodb } from 'react-icons/bi'
import { TbBrandNextjs } from 'react-icons/tb'
import { SiPrisma, SiTailwindcss } from 'react-icons/si'
import { IoLogoGithub, IoLogoVercel } from 'react-icons/io5'

import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <>
      <section className='space-y-6 pb-8 py-8 md:py-16 lg:py-20 '>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto'>
          <h1 className='font-bold leading-normal text-xl sm:text-2xl md:text-4xl lg:text-5xl'>
            Attendance Management System
          </h1>
          <p>This is a starter project</p>
        </div>
      </section>
      <section
        id='features'
        className='container space-y-6 py-8 dark:bg-transparent  mx-auto'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-bold text-2xl leading-[1.1] sm:text-2xl md:text-4xl'>
            Features
          </h2>
        </div>
        <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
          <Link href='/student/add'>
            {' '}
            <div className='cursor-pointer hover:border-green-500 relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
              <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
                <TbBrandNextjs size={40} />
                <div className='space-y-2'>
                  <h3 className='font-bold leading-normal'>Add Student</h3>
                  <p className='text-sm text-muted-foreground'>
                    Add student to the database
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href='/faculty/add'>
            <div className='cursor-pointer hover:border-green-500 relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
              <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
                <TbBrandNextjs size={40} />
                <div className='space-y-2'>
                  <h3 className='font-bold leading-normal'>Add Faculty</h3>
                  <p className='text-sm text-muted-foreground'>
                    Add faculty to the database
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href='/student/view'>
            <div className='cursor-pointer hover:border-green-500 relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
              <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
                <TbBrandNextjs size={40} />
                <div className='space-y-2'>
                  <h3 className='font-bold leading-normal'>View Students</h3>
                  <p className='text-sm text-muted-foreground'>
                    View students in the database
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href='/faculty/view'>
            <div className='cursor-pointer hover:border-green-500 relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
              <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
                <TbBrandNextjs size={40} />
                <div className='space-y-2'>
                  <h3 className='font-bold leading-normal'>View Faculties</h3>
                  <p className='text-sm text-muted-foreground'>
                    View faculties in the database
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
