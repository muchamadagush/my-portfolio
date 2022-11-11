/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import React from 'react'
import propertyImg from '../public/assets/Agus.png'
import { RiRadioButtonFill } from 'react-icons/ri'
import Link from 'next/link'
import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/router'

const property = () => {
  const { query } = useRouter()

  return (
    <div className='w-full'>
      <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
        <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10'>
          <Image className='absolute z-1' layout='fill' objectFit='cover' src={propertyImg} alt={'/'} />
          <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10'>
            <h2 className='py-2'>{ query.slug }</h2>
            <h3 className='py-4'>React JS / Tailwind</h3>
          </div>
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
          <p className='text-xl tracking-widest uppercase text-[#5651e5]'>Projects</p>
          <h2 className='py-4'>Overview</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae impedit ducimus nostrum? Et enim ad repellendus perferendis! Voluptate eligendi sequi sed perspiciatis porro officiis voluptatem. Perferendis ex commodi vero deserunt ducimus nostrum accusamus placeat sapiente labore, facilis atque non, voluptatum eveniet beatae illum ipsam veniam dolorum quo odit adipisci unde?</p>
          <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          <button className='px-8 py-2 mt-4'>Code</button>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-4'>
            <p className='text-center font-bold pb-2'>Technologies</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' /> React JS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' /> Tailwind</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' /> Javascript</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' /> Node JS</p>
            </div>
          </div>
        </div>
        <Link href={'/#projects'}>
          <p className='flex cursor-pointer underline gap-2 items-center'><AiOutlineLeft /> Back</p>
        </Link>
      </div>
    </div>
  )
}

export default property