import { ObjectId } from 'mongodb';

export interface Project {
  _id?: ObjectId;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planning';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  status?: 'completed' | 'in-progress' | 'planning';
  featured?: boolean;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}

export const validateProject = (project: CreateProjectRequest): void => {
  const required: (keyof CreateProjectRequest)[] = ['title', 'description', 'technologies'];
  const missing = required.filter(field => 
    !project[field] || 
    (Array.isArray(project[field]) && (project[field] as any[]).length === 0)
  );
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
};
