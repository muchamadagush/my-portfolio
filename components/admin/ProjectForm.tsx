import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ApiCall from '../../services/ApiCall'

interface ProjectFormProps {
  project?: any
  onSuccess: () => void
  onCancel: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    demoUrl: '',
    githubUrl: '',
    status: 'planning' as 'completed' | 'in-progress' | 'planning',
    featured: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies?.join(', ') || '',
        imageUrl: project.imageUrl || '',
        demoUrl: project.demoUrl || '',
        githubUrl: project.githubUrl || '',
        status: project.status || 'planning',
        featured: project.featured || false
      })
      
      // Set preview image if project has imageUrl
      if (project?.imageUrl) {
        setPreviewImage(project.imageUrl)
      }
    }
  }, [project])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    setUploadingImage(true)
    try {
      // Buat FormData untuk upload file
      const formData = new FormData()
      formData.append('file', file)
      
      // Debug informasi upload
      console.log('Uploading file:', file.name, file.type, file.size)
      
      // Gunakan fetch API langsung untuk memastikan file terkirim dengan benar
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Upload failed')
      }
      
      const data = await response.json()
      console.log('Upload response:', data)
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to upload image')
      }
      
      return data.data.imageUrl
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Image upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
      throw error
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let imageUrl = formData.imageUrl
      console.log('Initial imageUrl:', imageUrl)

      // Upload image if selected
      if (selectedFile) {
        console.log('Uploading selected file:', selectedFile.name)
        imageUrl = await uploadFile(selectedFile)
        console.log('Uploaded imageUrl:', imageUrl)
      }

      const projectData = {
        ...formData,
        imageUrl, // Make sure this is being set
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
      }
      
      console.log('Submitting project data:', projectData)

      if (project) {
        await ApiCall.Project.update(project._id, projectData)
        toast.success('Project updated successfully!')
      } else {
        await ApiCall.Project.create(projectData)
        toast.success('Project created successfully!')
      }

      onSuccess()
    } catch (error: any) {
      console.error('Project save error:', error)
      toast.error(error?.response?.data?.message || error.message || 'Failed to save project')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <p className="text-gray-600 mt-1">
            {project ? 'Update project information' : 'Create a new project for your portfolio'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors"
              placeholder="Enter project title"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors"
              placeholder="Describe your project..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technologies * <span className="text-gray-500 font-normal">(comma separated)</span>
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              required
              placeholder="React, TypeScript, Node.js, MongoDB"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Image
            </label>
            <div className="flex items-start space-x-4">
              {/* Image Preview */}
              {previewImage && (
                <div className="w-32 h-32 relative border rounded-md overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null)
                      setSelectedFile(null)
                      setFormData(prev => ({ ...prev, imageUrl: '' }))
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    &times;
                  </button>
                </div>
              )}
              
              {/* Upload Input */}
              <div className="flex-1">
                <div className="flex items-center justify-center w-full">
                  <label className={`flex flex-col w-full h-32 border-2 ${uploadingImage ? 'bg-gray-100 border-gray-300' : 'border-dashed border-gray-300 hover:border-[#5651e5]'} rounded-lg cursor-pointer`}>
                    <div className="flex flex-col items-center justify-center pt-7">
                      {uploadingImage ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5651e5] mx-auto"></div>
                          <p className="pt-2 text-sm text-gray-500">Uploading to Cloudinary...</p>
                        </div>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            {previewImage ? 'Change image' : 'Upload image'}
                          </p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="opacity-0" 
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                {!selectedFile && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Or use image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors mt-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Demo URL
            </label>
            <input
              type="url"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleInputChange}
              placeholder="https://demo.example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#5651e5] transition-colors"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="h-5 w-5 text-[#5651e5] focus:ring-[#5651e5] border-gray-300 rounded"
          />
          <label className="ml-3 block text-sm font-semibold text-gray-700">
            Featured Project
          </label>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || uploadingImage}
            className="px-6 py-3 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white rounded-lg hover:from-[#4c46d1] hover:to-[#5b8aff] disabled:from-gray-400 disabled:to-gray-400 font-semibold transition-all"
          >
            {isLoading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
