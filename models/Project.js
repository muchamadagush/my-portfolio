export const ProjectSchema = {
  _id: 'ObjectId',
  title: 'string',
  description: 'string',
  technologies: ['string'],
  imageUrl: 'string',
  demoUrl: 'string',
  githubUrl: 'string',
  status: 'string', // 'completed', 'in-progress', 'planning'
  featured: 'boolean',
  createdAt: 'date',
  updatedAt: 'date'
};

export const validateProject = (project) => {
  const required = ['title', 'description', 'technologies'];
  const missing = required.filter(field => !project[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  return true;
};
