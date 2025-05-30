/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { BsWhatsapp } from 'react-icons/bs'
import Link from 'next/link'

const Main = () => {
  return (
    <div id="home" className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest text-gray-600">
            Let&apos;s build something together
          </p>
          <h1 className="py-4 text-gray-700">
            Hi, I&apos;m <span className="text-[#5651e5]">Agus</span>
          </h1>
          <h1 className="py-4 text-gray-700">A Fullstack Web Developer</h1>
          <p className="py-4 text-gray-600 max-w-[70%] m-auto">
            As a Fullstack Web Developer, I am passionate about designing and building intuitive and high-performing digital experiences. Currently, I am delving into backend development, specifically robust and scalable REST API applications, while continuously expanding the spectrum of technologies I master to deliver innovative solutions.
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <div
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/muchamad-agus-hermawan/'
                )
              }
              className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <FaLinkedinIn />
            </div>
            <div
              onClick={() => window.open('https://github.com/muchamadagush/')}
              className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <FaGithub />
            </div>
            <div
              onClick={() =>
                window.open(
                  'https://www.instagram.com/muchamadagushermawan/'
                )
              }
              className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <AiFillInstagram />
            </div>
            <Link href={'https://wa.me/6282131571915'} passHref>
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <BsWhatsapp />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
