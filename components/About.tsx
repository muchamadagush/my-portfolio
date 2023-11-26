/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full md:h-screen p-2 flex items-center py-16'>
      <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl tracking-widest text-[#5651e5]'>About</p>
          <h2 className='py-4'>Who I Am</h2>
          <p className='py-2 text-gray-600'>// I am not your normal developer</p>
          <p className='py-2 text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores quaerat qui voluptates sit? Aspernatur eaque totam hic cumque beatae, illum ut. Blanditiis expedita neque, laudantium magni quos nihil animi? Delectus neque id enim dolore repudiandae, iusto inventore perspiciatis, quae ratione reiciendis provident sapiente, rerum quo maxime expedita odit eum ut!</p>
          <p className='py-2 text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores quaerat qui voluptates sit? Aspernatur eaque totam hic cumque beatae, illum ut. Blanditiis expedita neque, laudantium magni quos nihil animi? Delectus neque id enim dolore repudiandae, iusto inventore perspiciatis, quae ratione reiciendis provident sapiente, rerum quo maxime expedita odit eum ut!</p>
          <p className='py-2 text-gray-600 underline cursor-pointer'>Check out some of my latest projects.</p>
        </div>
        <div className='w-full h-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300'>
          <img className='rounded-xl' src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80" alt="/" />
        </div>
      </div>
    </div>
  )
}

export default About
