import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import useProject from '../../data/useProject'
import ApiCall from '../../services/ApiCall'
import ProjectForm from '../../components/admin/ProjectForm'
import { FiFolder, FiLogOut, FiSettings, FiPlus } from 'react-icons/fi'
import Link from 'next/link'

const Dashboard = (): JSX.Element => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list')
  const [editingProject, setEditingProject] = useState<any>(null)
  // Add underscore to indicate intentionally unused variable
  const [_searchTerm, _setSearchTerm] = useState('')
  
  const { data: projects, refetch } = useProject()

  // Filter projects based on search term
  const filteredProjects = projects?.filter(project => 
    project.title.toLowerCase().includes(_searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(_searchTerm.toLowerCase()) ||
    project.technologies.some((tech: string) => tech.toLowerCase().includes(_searchTerm.toLowerCase()))
  ) || []

  useEffect(() => {
    const token = localStorage.getItem('admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-user')
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setActiveTab('create')
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ApiCall.Project.delete(id)
        toast.success('Project deleted successfully')
        refetch()
      } catch (error) {
        toast.error('Failed to delete project')
      }
    }
  }

  const handleFormSuccess = () => {
    setActiveTab('list')
    setEditingProject(null)
    refetch()
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
    setActiveTab('list')
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen max-w-[1240px] w-full mx-auto bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 flex flex-col items-center border-b">
          <Link href="/" className="text-3xl font-bold text-[#5651e5] tracking-wider">
            AGUS
          </Link>
          <div className="mt-2 text-sm font-medium text-gray-600">
            <h2>Portfolio</h2>
            <p className="text-center text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
        
        <nav className="mt-6">
          <div className="px-3 py-1">
            <div className="flex items-center px-4 py-3 rounded-lg cursor-pointer bg-[#5651e5] text-white">
              <FiFolder className="mr-3" />
              <span className="font-medium">Projects</span>
            </div>
          </div>
          
          <div className="px-3 py-1">
            <div className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700">
              <FiSettings className="mr-3" />
              <span>Settings</span>
            </div>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-64">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center justify-center py-3 bg-[#5651e5] bg-opacity-10 text-[#5651e5] font-medium hover:bg-opacity-20 transition-colors"
          >
            <FiLogOut className="mr-2" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto border-l border-gray-200">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-3">
            <h1 className="text-lg font-medium text-gray-800">
              {activeTab === 'list' ? 'All Projects' : (editingProject ? 'Edit Project' : 'New Project')}
            </h1>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#5651e5] text-white flex items-center justify-center text-sm font-bold">
                {localStorage.getItem('admin-user')?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {/* Header with Action Button */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {activeTab === 'list' ? (
                  <>Project Info <span className="text-sm text-gray-500 ml-2">Showing {filteredProjects.length} of {filteredProjects.length} projects</span></>
                ) : (
                  editingProject ? 'Edit Project' : 'Add New Project'
                )}
              </h3>
            </div>
            
            {activeTab === 'list' && (
              <button
                onClick={() => {
                  setActiveTab('create')
                  setEditingProject(null)
                }}
                className="flex items-center px-4 py-2 rounded-md bg-[#5651e5] text-white hover:bg-[#4a45c2] transition-colors"
              >
                <FiPlus className="mr-2" />
                ADD NEW PROJECT
              </button>
            )}
          </div>
          
          {/* Main Content */}
          {activeTab === 'list' ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 border-b border-gray-200 text-xs font-medium text-gray-600 uppercase px-6 py-3 bg-gray-50">
                <div className="col-span-4">Project Info</div>
                <div className="col-span-3">Technologies</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Created</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              
              {/* Table Rows */}
              <div className="divide-y divide-gray-200">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div key={project._id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 items-center">
                      <div className="col-span-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img 
                              className="h-12 w-12 rounded-md object-cover border border-gray-200" 
                              src={project.imageUrl || "https://via.placeholder.com/150"} 
                              alt={project.title} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">{project.description}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 2).map((tech, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 text-xs bg-blue-50 text-[#5651e5] rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded">
                              +{project.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-2">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full 
                          ${project.status === 'completed' ? 'bg-green-50 text-green-700' : 
                          project.status === 'in-progress' ? 'bg-yellow-50 text-yellow-700' : 
                          'bg-gray-50 text-gray-700'}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <div className="col-span-2 text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      
                      <div className="col-span-1 flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-[#5651e5] hover:text-[#4a45c2] text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No projects found. Create your first project!
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProjects.length}</span> projects
                  </p>
                </div>
                
                {filteredProjects.length > 0 && (
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-[#5651e5] bg-[#5651e5] text-sm font-medium text-white">
                      1
                    </button>
                    <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <ProjectForm
              project={editingProject}
              onSuccess={handleFormSuccess}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
