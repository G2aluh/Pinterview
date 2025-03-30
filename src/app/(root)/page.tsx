import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dummyInterviews } from '../../constants'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
   <>
   <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>
          Interview Bersama AI yang dibekali dengan kepintaran dunia kerja
        </h2>
        <p className='text-lg'>
          Siap untuk menghadapi interview? Dengan teknologi AI yang canggih, kami siap membantu Anda.
        </p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href='/sign-in'>Mulai Interview</Link>
        </Button>
      </div>


      <Image src="/robot.png" alt='robot' width={400} height={400} className='max-sm:hidden' />

    </section><section className='flex flex-col gap-6 mt-8'>
        <h2>Interview Kamu</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Ambil Interview</h2>
        <div className="interviews-section">
        {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>

      </section>
      </>
  )
}

export default page
