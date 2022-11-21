/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import React from 'react'
import { RiRadioButtonFill } from 'react-icons/ri'
import Link from 'next/link'
import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/router'
import useProjectBySlug from '../../data/useProjectBySlug'

const property = () => {
  const { query } = useRouter()

  const queryProjectBySlug = useProjectBySlug(query.slug)

  const { data: dataProject }: any = queryProjectBySlug

  return (
    <div className='w-full'>
      <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
        <img className='absolute z-1 object-cover w-full h-full' src={dataProject?.thumbnailImg?.url} alt={'/'} />
        <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10'>
          <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10'>
            <h2 className='py-2'>{dataProject?.title}</h2>
            <h3 className='py-4'>React JS / Tailwind</h3>
          </div>
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
          <p className='text-xl tracking-widest uppercase text-[#5651e5]'>Projects</p>
          <h2 className='py-4'>Overview</h2>
          <p>{dataProject?.description}</p>
          <button onClick={() => window.open(dataProject?.demoLink)} className='px-8 py-2 mt-4 mr-8'>Demo</button>
          <button onClick={() => window.open(dataProject?.repoLink)} className='px-8 py-2 mt-4'>Code</button>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-4'>
            <p className='text-center font-bold pb-2'>Technologies</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              {dataProject?.technologies && dataProject?.technologies.map((item: any, index: number) => (
                <p key={index} className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' /> {item}</p>
              ))}
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