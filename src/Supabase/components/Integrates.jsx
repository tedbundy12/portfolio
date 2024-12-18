import React from 'react'

import strelka from '../assets/strelka.svg'
import allow from '../assets/allow.svg'

function Integrates() {
  return (
    <div className='px-40 flex gap-[175px] items-center f:justify-center first:flex-col first:gap-20 f:px-0 small:text-center mb-[264px]'>
        <div className=''>
            <p className='text-[#fff] font-custom font-normal leading-[43.2px] text-[36px] mb-[21px] h:px-2'>Integrates natively <br className=''/>
            with Supabase Auth</p>
            <p className='text-desc font-custom font-normal text-[14px] mb-[39px] g:px-4'>Using Postgres Row Level Security to create Object access rules.</p>
            <p className='text-desc text-[14px] font-custom font-normal leading-6 mb-[32px] g:px-2'>Storage Authorization is built around Postgres so that you can use <br /> any combination of SQL, Postgres functions, and even your own <br /> metadata to write policies.</p>
            <button className='flex items-center text-desc font-custom text-[14px] gap-[8px] w-[205px] h-[36px] bg-[#2A2A2A] text-center justify-center small:m-0 small:m-auto'><img src={strelka} alt=""/> Expore documentation</button>
        </div>
        <div><img src={allow} alt="" className='s:w-full'/></div>
    </div>
  )
}

export default Integrates