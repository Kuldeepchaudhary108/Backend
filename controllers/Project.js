import Project from '../models/Project.js'; // Adjust the path according to your project structure

// Create a new project
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};