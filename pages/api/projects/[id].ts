import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { Project, UpdateProjectRequest, ApiResponse, validateProject } from '../../../types/project';
import { ObjectId, Collection } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Project>>
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid project ID' 
    });
  }

  try {
    const db = await getDatabase();
    const collection: Collection<Project> = db.collection('projects');

    switch (req.method) {
      case 'GET':
        const project = await collection.findOne({ _id: new ObjectId(id) });
        
        if (!project) {
          return res.status(404).json({ 
            success: false, 
            message: 'Project not found' 
          });
        }
        
        res.status(200).json({ success: true, data: project });
        break;

      case 'PUT':
        const updateData: UpdateProjectRequest = req.body;
        
        if (updateData.title || updateData.description || updateData.technologies) {
          validateProject(updateData as any);
        }
        
        const updatedFields = {
          ...updateData,
          updatedAt: new Date()
        };
        
        const updateResult = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updatedFields },
          { returnDocument: 'after' }
        );
        
        if (!updateResult) {
          return res.status(404).json({ 
            success: false, 
            message: 'Project not found' 
          });
        }
        
        res.status(200).json({ success: true, data: updateResult });
        break;

      case 'DELETE':
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
        
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: 'Project not found' 
          });
        }
        
        res.status(200).json({ 
          success: true, 
          message: 'Project deleted successfully' 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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
