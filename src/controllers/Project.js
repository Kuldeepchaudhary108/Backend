import Project from "../models/Project.js"; // Adjust the path according to your project structure
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, team } = req.body;

    if (
      [title, description, githubLink, team].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const project = await Project.create({
      title,
      description,
      githubLink,
      team,
    });

    const createdProject = await Project.findById(project._id);

    if (!createdProject) {
      throw new ApiError(505, "Something went wrong while creating the team ");
    }

    return res
      .status(202)
      .json(new ApiResponse(200, createdProject, "Project added successfully"));
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating project", error: error.message });
  }
};
