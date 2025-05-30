import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../../lib/mongodb'
import type { Project, CreateProjectRequest, ApiResponse } from '../../../types/project'
import { validateProject } from '../../../types/project'
import type { Collection } from 'mongodb'
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import { UploadApiResponse } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// This tells Next.js not to parse the body as JSON
export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Project | Project[]>>
): Promise<void> {
  // Add CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const db = await getDatabase()
    const collection: Collection<Project> = db.collection('projects')

    switch (req.method) {
      case 'GET': {
        console.log('Fetching projects...')
        const projects = await collection
          .find({})
          .sort({ createdAt: -1 })
          .limit(50) // Add limit to prevent large queries
          .toArray()

        console.log(`Found ${projects.length} projects`)
        res.status(200).json({ success: true, data: projects })
        break
      }

      case 'POST': {
        // Use formidable to parse form data with files
        const form = formidable({ 
          keepExtensions: true,
          multiples: true,
          maxFileSize: 10 * 1024 * 1024 // 10MB
        })
        
        const parseFormData = async (): Promise<CreateProjectRequest> => {
          return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
              if (err) {
                return reject(new Error('Failed to parse form data'))
              }
              
              console.log('Form fields:', Object.keys(fields))
              console.log('Form files:', Object.keys(files))
              
              // Fix TypeScript error with file structure
              // Properly handle imageUrl which might be an array or a single file
              const imageFile = files.imageUrl 
                ? (Array.isArray(files.imageUrl) ? files.imageUrl[0] : files.imageUrl) 
                : null
              
              // Debugging file structure
              if (imageFile) {
                // Type assertion to tell TypeScript this is a formidable file
                const formidableFile = imageFile as formidable.File
                console.log('Image file details:', {
                  filename: formidableFile.originalFilename,
                  size: formidableFile.size,
                  path: formidableFile.filepath,
                  type: formidableFile.mimetype
                })
              }
              
              // Handle arrays from form data
              let technologies: string[] = []
              
              // Add proper type assertions for formidable fields
              const techField = fields.technologies as string | string[] | undefined
              
              if (typeof techField === 'string') {
                // If sent as comma-separated string
                technologies = techField.split(',').map(tech => tech.trim())
              } else if (Array.isArray(techField)) {
                // If sent as multiple fields with same name
                technologies = techField
              }
              
              // Handle image upload if file is provided
              let imageUrl = null
              
              // Use the already declared imageFile variable - remove this duplicate declaration
              // const imageFile = files.imageUrl && Array.isArray(files.imageUrl) 
              //   ? files.imageUrl[0] 
              //   : files.imageUrl
              
              if (imageFile) {
                try {
                  console.log('Uploading image to Cloudinary...')
                  
                  // Cast to formidable.File type
                  const formidableFile = imageFile as formidable.File
                  
                  // Check if file path exists
                  const fs = require('fs')
                  if (!fs.existsSync(formidableFile.filepath)) {
                    console.error('File does not exist at path:', formidableFile.filepath)
                    throw new Error('File not found on server')
                  }
                  
                  // Log file content for debugging
                  const fileStats = fs.statSync(formidableFile.filepath)
                  console.log('File stats:', {
                    size: fileStats.size,
                    isFile: fileStats.isFile()
                  })
                  
                  // Upload image to Cloudinary with explicit file path
                  const cloudinary = require('cloudinary').v2
                  const result = await cloudinary.uploader.upload(
                    formidableFile.filepath,
                    { 
                      folder: 'portfolio-projects',
                      resource_type: 'auto'
                    }
                  )
                  
                  imageUrl = result.secure_url
                  console.log('Image uploaded successfully:', imageUrl)
                } catch (uploadError) {
                  console.error('Image upload failed:', uploadError)
                }
              } else if (fields.imageUrl && typeof fields.imageUrl === 'string') {
                // If imageUrl is provided as a string URL instead of a file
                imageUrl = fields.imageUrl
              }
              
              // Handle cases where fields might be arrays - fix return type to match expected types
              const getFieldValue = (field: any): string | undefined => {
                if (Array.isArray(field)) return field[0] || undefined
                if (typeof field === 'string') return field
                return undefined
              }
              
              // Convert form fields to project data
              const projectData: CreateProjectRequest = {
                title: getFieldValue(fields.title) || '',
                description: getFieldValue(fields.description) || '',
                technologies,
                imageUrl: imageUrl || undefined,
                demoUrl: getFieldValue(fields.demoUrl),
                githubUrl: getFieldValue(fields.githubUrl),
                status: getFieldValue(fields.status) as any,
                featured: getFieldValue(fields.featured) === 'true'
              }
              
              resolve(projectData)
            })
          })
        }
        
        try {
          // Try to parse request as form data first
          const contentType = req.headers['content-type'] || ''
          
          let projectData: CreateProjectRequest
          
          if (contentType.includes('multipart/form-data')) {
            // Handle form data with potential file upload
            projectData = await parseFormData()
          } else {
            // Handle JSON data
            const buffer = await getRawBody(req)
            const text = buffer.toString('utf8')
            projectData = JSON.parse(text)
          }
          
          // Log data for debugging
          console.log('Final project data:', JSON.stringify({
            ...projectData,
            imageUrl: projectData.imageUrl ? 'Image URL exists' : 'No image URL'
          }, null, 2))
          
          validateProject(projectData)
          
          const newProject: Omit<Project, '_id'> = {
            ...projectData,
            imageUrl: projectData.imageUrl,
            demoUrl: projectData.demoUrl,
            githubUrl: projectData.githubUrl,
            status: projectData.status ?? 'planning',
            featured: projectData.featured ?? false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          console.log('Saving project with image:', newProject.imageUrl)
          
          const result = await collection.insertOne(newProject as Project)
          const createdProject = await collection.findOne({ _id: result.insertedId })
          
          if (createdProject === null) {
            res.status(404).json({ success: false, message: 'Project was created but could not be retrieved' })
            return
          }
          
          res.status(201).json({ success: true, data: createdProject })
        } catch (error) {
          console.error('Error processing form data:', error)
          const message = error instanceof Error ? error.message : 'Unknown error occurred'
          res.status(400).json({ success: false, message })
        }
        
        break
      }

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({
          success: false,
          message: `Method ${req.method ?? 'UNKNOWN'} not allowed`
        })
    }
  } catch (error) {
    console.error('API Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    res.status(500).json({ success: false, message: `Server error: ${message}` })
  }
}

// Helper function to get raw request body
function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0)
    
    req.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk])
    })
    
    req.on('end', () => {
      resolve(buffer)
    })
    
    req.on('error', (err) => {
      reject(err)
    })
  })
}
