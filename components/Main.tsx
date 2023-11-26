/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { BsFillPersonLinesFill } from 'react-icons/bs'
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
            I&apos;m a fullstack web developer specializing in building (and
            occasionally designing) exceptional digital experiences. Currently,
            I&apos;m focused on building and developing backend rest api
            applications while learning any technologies.
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
            <Link href={'/#contact'}>
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <BsFillPersonLinesFill />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
