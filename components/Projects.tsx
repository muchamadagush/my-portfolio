/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Link from 'next/link'
import React from 'react'
import useProject from '../data/useProject'
const URL_API_PRODUCTION = process.env.URL_API_PRODUCTION

const Projects = () => {
  const queryProjects = useProject()

  const { data: dataProjects } = queryProjects

  return (
    <div id="projects" className="w-full">
      <div className="max-w-[1240px] mx-auto px-2 pb-16 pt-24">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {dataProjects &&
            dataProjects.map((item: any, index: number) => (
              <div
                key={index}
                className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#5651e5] to-[#709dff]"
              >
                <img
                  className="rounded-xl group-hover:opacity-10 w-full object-cover"
                  src={URL_API_PRODUCTION + item.thumbnailImg.path}
                  alt={'/'}
                />
                <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <h3 className="text-2xl text-white tracking-wider text-center">
                    {item.title}
                  </h3>
                  <p className="pb-4 pt-2 text-white text-center">{item.mainTechnology}</p>
                  <Link href={`/projects/${item.slug}`}>
                    <p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
                      More Info
                    </p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
