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
          <p className='py-2 text-gray-600'>Hello, I&apos;m Agus, a Fullstack Web Developer ready to contribute my best to your projects. My expertise primarily revolves around building backend REST API applications, but I also enjoy delving into design. With a high enthusiasm for learning, I am always seeking opportunities to understand and master the latest technologies.</p>
          <p className='py-2 text-gray-600'>In every project, I not only strive for functionality but also aim to create an extraordinary digital experience. I believe that the combination of technical sophistication and a creative design touch can result in something truly captivating. Let&apos;s explore the world of web development together and bring your digital vision to life.</p>
          <p className='py-2 text-gray-600'>If you have an idea or a project you&apos;d like to build, I am ready to collaborate with you to achieve results beyond your expectations. Let&apos;s work together to create something exceptional in the online realm.</p>
        </div>
        <div className='w-full h-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300'>
          <img className='rounded-xl' src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80" alt="/" />
        </div>
      </div>
    </div>
  )
}

export default About
