import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { Project, CreateProjectRequest, ApiResponse, validateProject } from '../../../types/project';
import { Collection } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Project | Project[]>>
) {
  try {
    const db = await getDatabase();
    const collection: Collection<Project> = db.collection('projects');

    switch (req.method) {
      case 'GET':
        const projects = await collection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        
        res.status(200).json({ success: true, data: projects });
        break;

      case 'POST':
        const projectData: CreateProjectRequest = req.body;
        validateProject(projectData);
        
        const newProject: Omit<Project, '_id'> = {
          ...projectData,
          status: projectData.status || 'planning',
          featured: projectData.featured || false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const result = await collection.insertOne(newProject as Project);
        const createdProject = await collection.findOne({ _id: result.insertedId });
        
        if (!createdProject) {
          res.status(404).json({ success: false, message: 'Project was created but could not be retrieved' });
          return;
        }
        
        res.status(201).json({ success: true, data: createdProject });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ 
          success: false, 
          message: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(400).json({ success: false, message });
  }
}
