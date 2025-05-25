import React from 'react'
import useProject from '../data/useProject'

const Projects = () => {
  const queryProjects = useProject()

  const { data: dataProjects, isLoading, error } = queryProjects

  if (isLoading) {
    return (
      <div id="projects" className="w-full">
        <div className="max-w-[1240px] mx-auto px-2 pb-16 pt-24">
          <p className="text-xl tracking-widest uppercase text-[#5651e5]">
            Projects
          </p>
          <h2 className="py-4">Loading...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div id="projects" className="w-full">
        <div className="max-w-[1240px] mx-auto px-2 pb-16 pt-24">
          <p className="text-xl tracking-widest uppercase text-[#5651e5]">
            Projects
          </p>
          <h2 className="py-4">Error loading projects</h2>
        </div>
      </div>
    )
  }

  return (
    <div id="projects" className="w-full">
      <div className="max-w-[1240px] mx-auto px-2 pb-16 pt-24">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {dataProjects &&
            dataProjects.map((item: any, index: number) => (
              <div
                key={item._id || index}
                className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#5651e5] to-[#709dff]"
              >
                <img
                  className="rounded-xl group-hover:opacity-10 w-full object-cover h-48"
                  src={item.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image'}
                  alt={item.title || 'Project'}
                />
                <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <h3 className="text-2xl text-white tracking-wider text-center">
                    {item.title}
                  </h3>
                  <p className="pb-4 pt-2 text-white text-center">
                    {item.technologies?.join(', ') || 'Technologies'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    {item.demoUrl && (
                      <a 
                        href={item.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-center py-2 px-4 rounded-lg bg-white text-gray-700 font-bold text-sm cursor-pointer"
                      >
                        Demo
                      </a>
                    )}
                    {item.githubUrl && (
                      <a 
                        href={item.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-center py-2 px-4 rounded-lg bg-white text-gray-700 font-bold text-sm cursor-pointer"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
