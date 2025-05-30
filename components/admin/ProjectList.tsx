import React from 'react'
import { isEmpty } from 'lodash'

interface ProjectListProps {
  projects: any[]
  onEdit: (project: any) => void
  onDelete: (id: string) => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
      planning: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Planning' }
    }

    const config = statusConfig[status as keyof typeof statusConfig]

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  if (isEmpty(projects)) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#5651e5] to-[#709dff] rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-600 text-lg">Create your first project to showcase your work</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-[#5651e5] to-[#709dff]">
        <h3 className="text-xl font-bold text-white">
          Portfolio Projects ({projects.length})
        </h3>
        <p className="text-blue-100 mt-1">Manage and organize your projects</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Technologies
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        className="h-16 w-16 rounded-xl object-cover shadow-md"
                        src={project.imageUrl || 'https://via.placeholder.com/64x64?text=No+Image'}
                        alt={project.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-semibold text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-600 truncate max-w-xs">
                        {project.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(project.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.featured ? (
                    <span className="text-yellow-500 text-xl">⭐</span>
                  ) : (
                    <span className="text-gray-300 text-xl">☆</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5651e5] hover:text-[#4c46d1] font-semibold"
                      >
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 font-semibold"
                      >
                        Code
                      </a>
                    )}
                    <button
                      onClick={() => {
                        onEdit(project);
                      }}
                      className="text-[#5651e5] hover:text-[#4a45c2] mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(project._id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectList
