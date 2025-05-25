import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../../lib/mongodb'
import type { Project, CreateProjectRequest, ApiResponse } from '../../../types/project'
import { validateProject } from '../../../types/project'
import type { Collection } from 'mongodb'

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
    console.log('Attempting to connect to MongoDB...')
    const db = await getDatabase()
    console.log('Connected to MongoDB successfully')

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
        const projectData: CreateProjectRequest = req.body
        validateProject(projectData)

        const newProject: Omit<Project, '_id'> = {
          ...projectData,
          status: projectData.status ?? 'planning',
          featured: projectData.featured ?? false,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await collection.insertOne(newProject as Project)
        const createdProject = await collection.findOne({ _id: result.insertedId })

        if (createdProject === null) {
          res.status(404).json({ success: false, message: 'Project was created but could not be retrieved' })
          return
        }

        res.status(201).json({ success: true, data: createdProject })
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
